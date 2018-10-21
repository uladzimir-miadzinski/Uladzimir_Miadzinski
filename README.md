Nodejs API [https://localhost:3000/users](https://localhost:3000/users)

Angular Frontend [https://localhost:4200](https://localhost:4200)
##
Keywords: `http2`, `https`, `angular6`, `express`
##
How to run project?

First install dependencies (you should have `yarn` installed): 
- `yarn install`

Type in terminal or cmd: 
- `yarn build`
- `yarn start`

or 
- `yarn build:backend`
- `yarn start:backend`
- `yarn build:frontend`
- `yarn start:frontend`

##
Possible errors:
- ERR_CERT_AUTHORITY_INVALID: 
  - you should apply both certificates on `:3000` and `:4200` (just go to this routes and get certs)
  - if certs does not shows to you, rebuild backend (`yarn build:backend`)
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
- use `https` for requests, example: `https://localhost:3000/users`

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
