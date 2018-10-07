"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const spdy_1 = require("spdy");
const body_parser_1 = require("body-parser");
const fs_1 = require("fs");
const util_1 = require("util");
var STATUS;
(function (STATUS) {
    STATUS[STATUS["OK"] = 200] = "OK";
    STATUS[STATUS["CREATED"] = 201] = "CREATED";
    STATUS[STATUS["NOT_FOUND"] = 404] = "NOT_FOUND";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
const app = express();
const users = require('./users.json');
const PORT = 3000;
const urlencodedOptions = {
    extended: true
};
app.use(compression());
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded(urlencodedOptions));
console.log(__dirname);
const key = readFileAsync(`${__dirname}/server.key`);
const cert = readFileAsync(`${__dirname}/server.crt`);
Promise.all([key, cert])
    .then(contents => {
    const [key, cert] = contents;
    return {
        key,
        cert
    };
})
    .then(serverOptions => {
    spdy_1.createServer(serverOptions, app).listen(PORT, (err) => {
        if (err) {
            throw new Error(err);
        }
        console.log(`Server started and listening on port ${PORT}, please, use https://localhost:${PORT} for requests!`);
    });
})
    .catch(err => console.error(err));
app.get('/users', (req, res) => {
    res.status(STATUS.OK);
    res.json(users.filter((user) => !user.deleted));
});
app.get('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);
    if (user) {
        res.status(STATUS.OK);
        res.json(user);
    }
    else {
        res.sendStatus(STATUS.NOT_FOUND);
    }
});
app.post(['/users', '/users/add'], (req, res) => {
    const { name, password, birthday, firstLogin, nextNotify, info, deleted = false } = req.body;
    const id = users.length + 1;
    const newUser = {
        id, name, password, birthday, firstLogin, nextNotify, info, deleted: !!deleted
    };
    users.push(newUser);
    res.status(STATUS.CREATED);
    res.json(newUser);
});
app.put('/users/:id', (req, res) => {
    const updatedUser = updateUser(Object.assign({}, req.params, req.body));
    if (updatedUser) {
        res.status(STATUS.OK);
        res.json(updatedUser);
    }
    else {
        res.sendStatus(STATUS.NOT_FOUND);
    }
});
app.delete('/users/:id', (req, res) => {
    const deletedUser = deleteUserById(req.params.id);
    if (deletedUser) {
        res.status(STATUS.OK);
        res.json(deletedUser);
    }
    else {
        res.sendStatus(STATUS.NOT_FOUND);
    }
});
function convertToInt(id) {
    return typeof id === 'string' ? Number.parseInt(id, 10) : id;
}
function findIndexByUserId(id) {
    return users.findIndex((user) => user.id === convertToInt(id));
}
function findUserById(id, deleted = false) {
    return users.find((user) => user.id === convertToInt(id) && !deleted) || false;
}
function deleteUserById(id) {
    const index = findIndexByUserId(id);
    if (index >= 0) {
        users[index].deleted = true;
        return users[index];
    }
    else {
        return false;
    }
}
function updateUser(params) {
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
    }
    else {
        return false;
    }
}
async function readFileAsync(filepath) {
    try {
        return await util_1.promisify(fs_1.readFile)(filepath, 'utf8');
    }
    catch (err) {
        console.error(err);
        return err;
    }
}
//# sourceMappingURL=server.js.map