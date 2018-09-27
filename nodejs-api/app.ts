import * as express from 'express';
import * as compression from 'compression';
import {createServer} from 'spdy';
import {json, urlencoded} from 'body-parser';
import {readFile} from 'fs';
import {promisify} from 'util';
import User from './user';
import ResponseBody from './responseBody';

const PORT = 3000;
const STATUS_FAIL = 'failed';
const STATUS_SUCCESS = 'success';

const app = express();

const urlencodedOptions = {
  extended: true
};

app.use(compression());
app.use(json());
app.use(urlencoded(urlencodedOptions));

const key: Promise<string> = readFileAsync('api.key');
const cert: Promise<string> = readFileAsync('api.crt');

Promise.all([key, cert])
  .then(contents => {
    let [key, cert] = contents;
    return {
      key,
      cert
    };
  })
  .then(serverOptions => {
    createServer(serverOptions, app).listen(PORT, (err: string) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`Server started and listening on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));


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
  const resBody: ResponseBody = {};
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
  const resBody: ResponseBody = {};
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

async function readFileAsync(filepath: string): Promise<string> {
  try {
    return await promisify(readFile)(filepath, 'utf8');
  } catch (err) {
    console.error(err);
    return err;
  }
}