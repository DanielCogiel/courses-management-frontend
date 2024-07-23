# Courses' management application

## Description
This project is a frontend for a course management application, built using Angular with Angular Material. API to connect to from this frontend can be found [here](https://github.com/DanielCogiel/courses-management-backend).

## Prerequisites
- **Node v20.15.1** or higher
- Defined environment variable (for example in _.env_ file placed in root of project - _courses-frontend_ directory)

## Environment
There is only one environment variable in this project and it's called ```SERVER_URL```. It is an address of backend that it's connecting to.

##  Installation
In order to run application, first install all required dependencies using Node Package Manager in root (_courses-frontend_ directory) of this project:
```
npm i
```
Then use:
```
npx ng serve
```
in order to run application. You will be able to access it on [http://localhost:4200](http://localhost:4200) unless you changed application port.

To create production build use:
```
npx ng build
```
