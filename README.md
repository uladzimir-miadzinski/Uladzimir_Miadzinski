Demo: https://youtu.be/4ucRGlT6Zhs

Nodejs API [http://localhost:3000/users](https://localhost:3000/users)

Angular Frontend [http://localhost:4200](https://localhost:4200)
##
Keywords: `http`, `angular6`, `express`
##
How to run project?

First install dependencies (you should have `npm` installed): 
- `npm install`

Type in terminal or cmd: 
- `npm build`
- `npm start`

or 
- `npm run build:backend`
- `npm run start:backend`
- `npm run build:frontend`
- `npm run start:frontend`

##
Availible routes:

* GET 
  - `/users` - get list of active (deleted: 0) users
  - `/users/:id` - get user by id
  - `/login-check` - check if user logged in
  - `/user-exists` - check if user exists (by query params, but now supported only by name param)
  - `/current-user` - get current user identity
  
* POST
  - `/logout` - logout current user
  - `/login` - login user
  - `/users` - should add in memory user
  
* PUT 
  - `/reassign-password` - reassign new password for user
  - `/users/:id` - should update in memory specific user by id
  - `/current-user` - should update in memory specific user by id
  
* DELETE 
  - `/users/:id` - should remove from memory specific user by id
  
##

Conditions: 
- content type has to be application/json
- all users must be located in users.json file as array, and we will never modify it programmatically with fields like:
  - id, name, password, date of birth, date of first login, date of next notification, information.
- all dates have to be in ISO strings
- use `http` for requests, example: `http://localhost:3000/users`

##
for any questions - skype: `medinky_skype`

# Medinsky

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


---- 

commit a047304a2126228a3d5bad5a49664dae61cf05ff - NodeJS 10, http2 + spdy + jwt with RSA

commit cc7f4efed675be246027b30118eace9ec0e307f4 - NodeJS 12, http + jwt with HS256
