# Manabu
> Manabu means "learn" in Japanese.

> It is a knowledge sharing site allowing Admins to post video and written content which users can access.

> It allows users the ability to request admin permissions, so they too may be able to create courses.

> It allows admins the ability to switch views and roles from admin to a normal user.

> It offers a super-admin user with the following privileges:

- The ability to approve users requests to gain admin capabilities.
- The ability to activate and deactivate courses on the platform.
- The ability to view detailed course statistics and both user reviews and ratings.

>It allows both the user and admin to update their personal information specifically:
- Images 
- Personal portfolio links
- A brief about section

## Architecture

### Overview

Manabu is built on the MEAN (MongoDB Express Angular and Node) stack.

There is provision made for storing media either locally or on S3.

There is also auth capabilities provided by Keycloak (or can be swopped out for an alternate provider).


#### Running the code

Manabu is super simple in that it does not require any building before running it.

All bootstrap tasks are taken care of by the NPM tasks configured in the `package.json` file.

##### Getting Application running

1. Ensure that MongoDB is installed [see here for installation instructions](https://docs.mongodb.com/manual/installation/). MongoDB needs to run on port 27017
2. Ensure that you have the manabu-backend instance cloned and running on your local machine. 
3. Run `npm install` in order to install all the packages which are listed in the package.json file. (node needs to be installed on the local machine)
4. The app uses Keycloak for auth - the README on manabu-backed project has detailed instructions for setting up Keycloak
5. Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.


# Manabu Ui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

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
