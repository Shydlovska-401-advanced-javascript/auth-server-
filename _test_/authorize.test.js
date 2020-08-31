'use strict';

require('dotenv').config();
let supergoose = require('@code-fellows/supergoose');
const authorize = require('../src/auth/authorize.js');
const User = require('../src/auth/users.schema.js');
const server = require('../server.js').server;
const mockRequest = supergoose(server);

beforeEach( async () => {
  const admin= { username: 'admin', password: 'password', role: 'admin', email: 'ad@min.com' };
  await User(admin).save();
  const user = { username: 'user', password: 'password1', role: 'user', email: 'us@min.com' };
  await User(user).save();
  const writer = { username: 'writer', password: 'password2', role: 'writer', email: 'wr@min.com' };
  await User(writer).save();
  const editor = { username: 'editor', password: 'password3', role: 'editor', email: 'ed@min.com' };
  await User(editor).save();
});

afterEach( async () => {
  await User.deleteMany({});
});

describe('admin role', () => {
 
it(' should responce 200 for admin om /read route', async () => {

    const resultsAdmin = await mockRequest
      .post('/signin').auth('admin', 'password');
    let req = {
        headers: {
            authorization: `Bearer ${resultsAdmin.body.token}`,
        },
    };
  
    const response = await mockRequest.get('/read').auth(resultsAdmin.body.token, {type: "bearer"});
    expect(response.status).toBe(200);

})

it(' should responce 200 for admin om /add route', async () => {

    const resultsAdmin = await mockRequest
      .post('/signin').auth('admin', 'password');
    let req = {
        headers: {
            authorization: `Bearer ${resultsAdmin.body.token}`,
        },
    };
  
    const response = await mockRequest.post('/add').auth(resultsAdmin.body.token, {type: "bearer"});
    expect(response.status).toBe(200);

})

it(' should responce 200 for admin om /update route', async () => {

    const resultsAdmin = await mockRequest
      .post('/signin').auth('admin', 'password');
    let req = {
        headers: {
            authorization: `Bearer ${resultsAdmin.body.token}`,
        },
    };
  
    const response = await mockRequest.put('/change').auth(resultsAdmin.body.token, {type: "bearer"});
    expect(response.status).toBe(200);

})

it(' should responce 200 for admin om /delete route', async () => {

    const resultsAdmin = await mockRequest
      .post('/signin').auth('admin', 'password');
    let req = {
        headers: {
            authorization: `Bearer ${resultsAdmin.body.token}`,
        },
    };
  
    const response = await mockRequest.delete('/remove').auth(resultsAdmin.body.token, {type: "bearer"});
    expect(response.status).toBe(200);

})

});


describe('writer role', () => {

it(' should responce 200 for writer om /read route', async () => {

    const resultsWriter = await mockRequest
    .post('/signin').auth('writer', 'password2');
  let req = {
      headers: {
          authorization: `Bearer ${resultsWriter.body.token}`,
      },
  };

  const response = await mockRequest.get('/read').auth(resultsWriter.body.token, {type: "bearer"});
  expect(response.status).toBe(200);

})

it(' should responce 200 for wtiter on /add route', async () => {

    const resultsWriter = await mockRequest
      .post('/signin').auth('writer', 'password2');
    let req = {
        headers: {
            authorization: `Bearer ${resultsWriter.body.token}`,
        },
    };
  
    const response = await mockRequest.post('/add').auth(resultsWriter.body.token, {type: "bearer"});
    expect(response.status).toBe(200);

})

});

describe('editor role', () => {

it(' should responce 200 for editor om /read route', async () => {

    const resultsEditor = await mockRequest
    .post('/signin').auth('editor', 'password3');
  let req = {
      headers: {
          authorization: `Bearer ${resultsEditor.body.token}`,
      },
  };

  const response = await mockRequest.get('/read').auth(resultsEditor.body.token, {type: "bearer"});
  expect(response.status).toBe(200);

})

it(' should responce 200 for editor on /add route', async () => {

    const resultsEditor = await mockRequest
      .post('/signin').auth('editor', 'password3');
    let req = {
        headers: {
            authorization: `Bearer ${resultsEditor.body.token}`,
        },
    };
  
    const response = await mockRequest.post('/add').auth(resultsEditor.body.token, {type: "bearer"});
    expect(response.status).toBe(200);

})

it(' should responce 200 for editor on /update route', async () => {

    const resultsEditor = await mockRequest
      .post('/signin').auth('editor', 'password3');
    let req = {
        headers: {
            authorization: `Bearer ${resultsEditor.body.token}`,
        },
    };
  
    const response = await mockRequest.put('/change').auth(resultsEditor.body.token, {type: "bearer"});
    expect(response.status).toBe(200);

})

});

describe('user role', () => {

    it(' should responce 200 for user om /read route', async () => {
    
        const resultsUser = await mockRequest
        .post('/signin').auth('user', 'password1');
      let req = {
          headers: {
              authorization: `Bearer ${resultsUser.body.token}`,
          },
      };
    
      const response = await mockRequest.get('/read').auth(resultsUser.body.token, {type: "bearer"});
      expect(response.status).toBe(200);
    
    })
    
    
    })
