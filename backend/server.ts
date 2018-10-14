import * as express from 'express';
import * as compression from 'compression';
import * as jwt from 'jsonwebtoken';
import * as md5 from 'md5';
// import * as expressJwt from 'express-jwt';
import { createServer } from 'spdy';
import { json, urlencoded } from 'body-parser';
import { readFile } from 'fs';
import { promisify } from 'util';
import * as cors from 'cors';

export enum STATUS {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404
}

export interface User {
  id: number;
  name: string;
  password: string;
  birthday: Date;
  firstLogin: Date;
  nextNotify: Date;
  info: string;
  deleted: boolean;
}

const app = express();
const users: User[] = require('./users.json');
const PORT = 3000;
const urlencodedOptions = {
  extended: true
};

app.use(compression());
app.use(json());
app.use(urlencoded(urlencodedOptions));
app.use(cors());

const key: Promise<string> = readFileAsync(`${__dirname}/server.key`);
const cert: Promise<string> = readFileAsync(`${__dirname}/server.crt`);
// const pubKey: Promise<string> = readFileAsync(`${__dirname}/server.pub`);

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

app.get('/users', (req: express.Request, res: express.Response) => {
  res.status(STATUS.OK);
  res.json(users.filter((user: User) => !user.deleted));
});

app.get('/users/:id', (req: express.Request, res: express.Response) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.status(STATUS.OK);
    res.json(user);
  } else {
    res.sendStatus(STATUS.NOT_FOUND);
  }
});

app.post('/login', (req: express.Request, res: express.Response) => {
  const { name, password } = req.body;
  const user: User | false = validateUserNamePassword(name, password);
  if (user) {
    key.then((RSA_PRIVATE_KEY: string) => {
      const expiresIn = 60;
      const token = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn,
        subject: user.id.toString()
      });
      res.status(200).json({
        token
      });
    }).catch(err => {
      res.send(err);
    });
  } else {
    res.sendStatus(401);
  }
});

app.get('/auth-check', (req: express.Request, res: express.Response) => {
  console.log(req);
  res.send(req).status(200);
 /* return
    .then(auth => res.status(auth ? 200 : 401))
    .catch(() => res.status(500));*/
});

app.post(['/users', '/users/add'], (req: express.Request, res: express.Response) => {
  const { name, password, birthday, firstLogin, nextNotify, info, deleted = false } = req.body;
  const id: number = users.length + 1;

  const newUser: User = {
    id, name, password, birthday, firstLogin, nextNotify, info, deleted: !!deleted
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

/*function isAuthorized() {
  return pubKey.then(RSA_PUBLIC_KEY => {
    return expressJwt({
      secret: RSA_PUBLIC_KEY
    });
  });
}*/

function validateUserNamePassword(name: string, password: string): User | false {
  return findUserByNamePassword(name, password) || false;
}

function convertToInt(id: number | string): number {
  return typeof id === 'string' ? Number.parseInt(id, 10) : id;
}

function findUserByNamePassword(name: string, password: string) {
  console.log(md5(password));
  return users.find((user: User) => user.name === name && user.password === md5(password));
}

function findIndexByUserId(id: number | string): number {
  return users.findIndex((user: User) => user.id === convertToInt(id));
}

function findUserById(id: number | string, deleted = false): User | boolean {
  return users.find((user: User) => user.id === convertToInt(id) && !deleted) || false;
}

function deleteUserById(id: number): User | boolean {
  const index = findIndexByUserId(id);
  if (index >= 0) {
    users[index].deleted = true;
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
