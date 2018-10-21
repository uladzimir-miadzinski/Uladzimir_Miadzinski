import * as express from 'express';
import * as compression from 'compression';
import * as jwt from 'jsonwebtoken';
import * as md5 from 'md5';
import { createServer } from 'spdy';
import { json, urlencoded } from 'body-parser';
import { readFile } from 'fs';
import { promisify } from 'util';
import * as cors from 'cors';
import * as moment from 'moment';
// @ts-ignore
import * as cookieParser from 'cookie-parser';
// @ts-ignore
import * as isMd5 from 'is-md5';

export enum STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export interface Jwt {
  exp: number;
  sub: string;
}

export interface User {
  id: number;
  name: string;
  age: number;
  password: string;
  birthday: Date;
  firstLogin: Date;
  nextNotify: Date;
  info: string;
  deleted: number;
}

const app = express();
const users: User[] = require('./users.json');
const PORT = 3000;
const urlencodedOptions = {
  extended: true
};
const corsOptions = {
  origin: 'https://localhost:4200',
  credentials: true
};

app.use(compression());
app.use(json());
app.use(urlencoded(urlencodedOptions));
app.use(cors(corsOptions));
app.use(cookieParser());

const key: Promise<string> = readFileAsync(`${__dirname}/server.key`);
const cert: Promise<string> = readFileAsync(`${__dirname}/server.crt`);

Promise.all([key, cert])
  .then(contents => {
    const [key, cert] = contents;
    return {
      key,
      cert
    };
  })
  .then(serverOptions => {
    return createServer(serverOptions, app).listen(PORT, (err: string) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`Server started and listening on port ${PORT}, please, use https://localhost:${PORT} for requests!`);
    });
  })
  .catch(err => console.error(err));

app.get('/users', getActiveUsers);
app.get('/users/:id', getUserById);
app.get('/login-check', loginCheck);
app.post('/login', login);
app.post('/logout', logout);
app.get('/user-exists', checkIfUserExists);
app.put('/reassign-password', reassignPassword);
app.post(['/users', '/users/add'], addNewUser);
app.delete('/users/:id', deleteUser);
app.put('/users/:id', updateUserById);
app.get('/current-user', getCurrentUser);
app.put('/current-user', updateCurrentUser);

function updateCurrentUser(req: express.Request, res: express.Response) {
  const { jwtoken } = req.cookies;
  const user = getUserFromJwt(jwtoken);

  if (user !== null) {
    const updatedUser: User | boolean = updateUser(Object.assign({}, { id: user.id }, req.body));

    if (updatedUser) {
      res.status(STATUS.OK);
      res.json(updatedUser);
    } else {
      res.sendStatus(STATUS.NOT_FOUND);
    }
  } else {
    res.status(STATUS.UNAUTHORIZED).send();
  }
}

function updateUserById(req: express.Request, res: express.Response) {
  const updatedUser: User | boolean = updateUser(Object.assign({}, req.params, req.body));
  if (updatedUser) {
    res.status(STATUS.OK);
    res.json(updatedUser);
  } else {
    res.sendStatus(STATUS.NOT_FOUND);
  }
}

function deleteUser(req: express.Request, res: express.Response) {
  const deletedUser: User | boolean = deleteUserById(req.params.id);
  if (deletedUser) {
    res.status(STATUS.OK);
    res.json(deletedUser);
  } else {
    res.sendStatus(STATUS.NOT_FOUND);
  }
}

function addNewUser(req: express.Request, res: express.Response) {
  res.status(STATUS.CREATED).json(createUser(req.body));
}

function createUser(params: User) {
  const { name, age, password, birthday, firstLogin, nextNotify, info, deleted = 0 } = params;
  const id: number = users.length + 1;

  const newUser: User = {
    id, name, age, password, birthday, firstLogin, nextNotify, info, deleted
  };
  users.push(newUser);
  return newUser;
}

function getCurrentUser(req: express.Request, res: express.Response) {
  const { jwtoken } = req.cookies;
  const user = getUserFromJwt(jwtoken);
  res.status(user !== null ? STATUS.OK : STATUS.UNAUTHORIZED).send(user);
}

function getUserFromJwt(jwtoken: string): User | null {
  if (jwtoken !== 'undefined') {
    const parsedJwt = parseJwt(jwtoken);
    return parsedJwt !== null ? findUserById(parsedJwt.sub) : null;
  } else {
    return null;
  }
}

function reassignPassword(req: express.Request, res: express.Response) {
  const { name, password } = req.body;
  const user = findUserByName(name);
  if (user !== null) {
    const updatedUser: User | boolean = assignPassword(user, password);
    res.status(updatedUser ? STATUS.OK : STATUS.BAD_REQUEST).send(updatedUser);
  } else {
    res.status(STATUS.NOT_FOUND).send();
  }
}

function assignPassword(user: User, password: string): User | boolean {
  return updateUser({ ...user, password: md5(password) });
}

function checkIfUserExists(req: express.Request, res: express.Response) {
  res.status(STATUS.OK).send(fetchActiveUsers(req.query).length > 0);
}

function fetchActiveUsers(query: User) {
  return users.filter((user: User) => {
    const filterByName = (typeof query.name !== 'undefined') ? user.name === query.name : true;
    return user.deleted === 0 && filterByName;
  });
}

function getActiveUsers(req: express.Request, res: express.Response) {
  res.status(STATUS.OK).json(fetchActiveUsers(req.query));
}

function getUserById(req: express.Request, res: express.Response) {
  const user = findUserById(req.params.id);
  if (user !== null) {
    res.status(STATUS.OK).send(user);
  } else {
    res.status(STATUS.NOT_FOUND).send();
  }
}

function login(req: express.Request, res: express.Response) {
  const { name, password } = req.body;
  const user: User | false = validateUserNamePassword(name, password);
  if (user) {
    key.then((RSA_PRIVATE_KEY: string) => {
      const expiresIn = '60m';
      const token = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn,
        subject: user.id.toString()
      });
      res.status(STATUS.OK).cookie('jwtoken', token, { httpOnly: true, secure: true }).send();
    }).catch(err => {
      res.send(err);
    });
  } else {
    res.status(STATUS.UNAUTHORIZED).send();
  }
}

function logout(req: express.Request, res: express.Response) {
  res.clearCookie('jwtoken').send();
}

function loginCheck(req: express.Request, res: express.Response) {
  const { jwtoken } = req.cookies;
  if (typeof jwtoken !== 'undefined') {
    const status = getAuthorizeStatusCode(parseJwt(jwtoken));
    res.status(status).send();
  } else {
    res.status(STATUS.UNAUTHORIZED).send();
  }
}

function parseJwt(jwtoken: string): Jwt | null {
  return jwt.decode(jwtoken) as Jwt;
}

function getAuthorizeStatusCode(jwtoken: Jwt | null) {
  return jwtoken === null || jwtIsExpired(jwtoken) || findActiveUserById(jwtoken.sub) === null ? STATUS.UNAUTHORIZED : STATUS.OK;
}

function jwtIsExpired(jwtoken: Jwt) {
  return moment.unix(jwtoken.exp).isBefore(moment());
}

function validateUserNamePassword(name: string, password: string): User | false {
  return findUserByNamePassword(name, password) || false;
}

function convertToInt(id: number | string): number {
  return typeof id === 'string' ? Number.parseInt(id, 10) : id;
}

function findUserByNamePassword(name: string, password: string) {
  return users.find((user: User) => user.name === name && user.password === md5(password) && user.deleted === 0);
}

function findUserByName(name: string): User | null {
  return users.find((user: User) => user.name === name && user.deleted === 0) || null;
}

function findIndexByUserId(id: number | string): number {
  return users.findIndex((user: User) => user.id === convertToInt(id));
}

function findUserById(id: number | string): User | null {
  return users.find((user: User) => user.id === convertToInt(id)) || null;
}

function findActiveUserById(id: number | string): User | null {
  return users.find((user: User) => user.id === convertToInt(id) && user.deleted === 0) || null;
}

function deleteUserById(id: number): User | boolean {
  const index = findIndexByUserId(id);
  if (index >= 0) {
    users[index].deleted = 1;
    return users[index];
  } else {
    return false;
  }
}

function updateUser(params: User): User | boolean {
  const { id, name, password, birthday, firstLogin, nextNotify, info, deleted = 0 } = params;
  const index = findIndexByUserId(id);
  if (index >= 0) {
    users[index].name = name;
    users[index].password = isMd5(password) ? password : md5(password);
    users[index].birthday = birthday;
    users[index].firstLogin = firstLogin;
    users[index].nextNotify = nextNotify;
    users[index].info = info;
    users[index].deleted = deleted;
    return users[index];
  } else {
    return false;
  }
}

async function readFileAsync(filepath: string): Promise<string> {
  try {
    return await promisify(readFile)(filepath, 'utf8');
  } catch (err) {
    console.error(err);
    return err;
  }
}
