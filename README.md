# generator-express-service
[![Build Status](https://secure.travis-ci.org/jalateras/generator-express-service.png?branch=master)](https://travis-ci.org/jalateras/generator-express-service)

## Usage

Install `generator-express-service`:
```
npm install -g generator-express-service
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo express-service`, optionally passing the service name:
```
yo express-service [app-name]
```

The generated application includes

* web appplication framework `express`
* logging framework `log4js`
* testing framework `mocha`
* code coverage `istanbul`
* build tool `grunt`
* configuration `nconf`

## Generators

### Resources

To generate a new resource and associated test scaffolding
```
yo express-service:resource account
```

This command will ask a number of questions including the resource path name and what actions to support. It will

* create a new resource in the server/resources directory
* create a new handler for every action that you answered 'yes' too
* create test scafolding for the resource and associated actions
* update server/api.js to include the new resource in its routes





