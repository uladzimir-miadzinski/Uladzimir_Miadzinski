import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as spdy from 'spdy';
import User from './user';
import IResponseBody from "./IResponseBody";

const PORT = 3000;
const STATUS_FAIL = 'failed';
const STATUS_SUCCESS = 'success';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const key = fs.readFileSync('api.key');
const cert = fs.readFileSync('api.crt');
const serverOptions = {
  key,
  cert
};

spdy
  .createServer(serverOptions, app)
  .listen(PORT, (err: string) => {
    if (err) {
      throw new Error(err);
    }
    console.log(`Server started and listening on port ${PORT}`);
  });

const parsedUsers: Array<any> = require('../users.json');
const users: Array<User> = [];

parsedUsers.forEach((parsedUser) => {
  users.push(new User(
    parsedUser.id,
    parsedUser.name,
    parsedUser.password,
    parsedUser.birthday,
    parsedUser.firstLogin,
    parsedUser.nextNotify,
    parsedUser.info
  ));
});

app.get('/users', (req: express.Request, res: express.Response) => {
  res.json(users);
});

app.get('/users/:id', (req: express.Request, res: express.Response) => {
  res.json(users[findIndexByUserId(req.params.id)] || null);
});

app.post(['/users', '/users/add'], (req: express.Request, res: express.Response) => {
  const post = req.body;
  const newUserId: number = (findIndexByUserId(post.id) >= 0) ? Date.now() : Number.parseInt(post.id, 10);
  const newUser = new User(newUserId, post.name, post.password, post.birthday, post.firstLogin, post.nextNotify, post.info);
  users.push(newUser);
  res.json(newUser);
});

app.put('/users/:id', (req: express.Request, res: express.Response) => {
  const put = req.body;
  const requestedId = req.params.id;
  const resBody: IResponseBody = {};
  let userIndex = findIndexByUserId(requestedId);
  if (userIndex >= 0) {
    Object.keys(put).forEach((key => {
      if (key !== 'id' && isNotUndefined(put[key])) {
        users[userIndex][key] = put[key];
      }
    }));
    resBody.status = STATUS_SUCCESS;
    resBody.message = `User #${requestedId} CHANGED.`;
  } else {
    resBody.status = STATUS_FAIL;
    resBody.message = `User #${requestedId} NOT FOUND.`;
  }
  resBody.users = users;
  res.json(resBody);
});

app.delete('/users/:id', (req: express.Request, res: express.Response) => {
  const requestedId = req.params.id;
  const resBody: IResponseBody = {};
  let userIndex = findIndexByUserId(requestedId);
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    resBody.status = STATUS_SUCCESS;
    resBody.message = `User #${requestedId} REMOVED.`;
  } else {
    resBody.status = STATUS_FAIL;
    resBody.message = `User #${requestedId} NOT FOUND.`;
  }
  resBody.users = users;
  res.json(resBody);
});

function findIndexByUserId(id: number | string): number {
  const requestedId: number = (typeof id === 'string') ? Number.parseInt(id, 10) : id;
  return users.findIndex((user: User) => user.id === requestedId);
}

function isNotUndefined(param: any): boolean {
  return (typeof param !== 'undefined');
}