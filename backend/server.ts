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

app.post(['/users', '/users/add'], (req: express.Request, res: express.Response) => {
  const { name, password, birthday, firstLogin, nextNotify, info, deleted = 0 } = req.body;
  const id: number = users.length + 1;

  const newUser: User = {
    id, name, password, birthday, firstLogin, nextNotify, info, deleted
  };
  users.push(newUser);

  res.status(STATUS.CREATED);
  res.json(newUser);
});

app.put('/users/:id', (req: express.Request, res: express.Response) => {
  const updatedUser: User | boolean = updateUser(Object.assign({}, req.params, req.body));
  if (updatedUser) {
    res.status(STATUS.OK);
    res.json(updatedUser);
  } else {
    res.sendStatus(STATUS.NOT_FOUND);
  }
});

app.delete('/users/:id', (req: express.Request, res: express.Response) => {
  const deletedUser: User | boolean = deleteUserById(req.params.id);
  if (deletedUser) {
    res.status(STATUS.OK);
    res.json(deletedUser);
  } else {
    res.sendStatus(STATUS.NOT_FOUND);
  }
});

function reassignPassword(req: express.Request, res: express.Response) {
  const { name, password } = req.body;
  console.log(req.body);
  console.log(name);
  console.log(password);
  const user = findUserByName(name);
  console.log(user);
  if (typeof user !== 'undefined') {
    const updatedUser: User | boolean = assignPassword(user, password);
    res.status(updatedUser ? STATUS.OK : STATUS.BAD_REQUEST).send(updatedUser);
  } else {
    res.status(STATUS.NOT_FOUND).send();
  }
}

function assignPassword(user: User, password: string): User | boolean {
  const userParams = { ...user };
  userParams.password = md5(password);
  return updateUser(userParams);
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
  if (user) {
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
      res.status(STATUS.OK).cookie('jwt', token, { httpOnly: true, secure: true }).send();
    }).catch(err => {
      res.send(err);
    });
  } else {
    res.status(STATUS.UNAUTHORIZED).send();
  }
}

function logout(req: express.Request, res: express.Response) {
  res.clearCookie('jwt').send();
}

function loginCheck(req: express.Request, res: express.Response) {
  if (typeof req.cookies.jwt !== 'undefined') {
    const status = getAuthorizeStatusCode(jwt.decode(req.cookies.jwt) as Jwt);
    res.status(status).send();
  } else {
    res.status(STATUS.UNAUTHORIZED).send();
  }
}

function getAuthorizeStatusCode(jwtoken: Jwt) {
  return isJwtExpired(jwtoken) || !findActiveUserById(jwtoken.sub) ? STATUS.UNAUTHORIZED : STATUS.OK;
}

function isJwtExpired(jwtoken: Jwt) {
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

function findUserByName(name: string) {
  return users.find((user: User) => user.name === name && user.deleted === 0);
}

function findIndexByUserId(id: number | string): number {
  return users.findIndex((user: User) => user.id === convertToInt(id));
}

function findUserById(id: number | string): User | boolean {
  return users.find((user: User) => user.id === convertToInt(id)) || false;
}

function findActiveUserById(id: number | string) {
  return users.find((user: User) => user.id === convertToInt(id) && user.deleted === 0) || false;
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
  const { id, name, password, birthday, firstLogin, nextNotify, info, deleted } = params;
  const index = findIndexByUserId(id);
  if (index >= 0) {
    users[index].name = name;
    users[index].password = password;
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
