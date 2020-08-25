'use strict';

require('@code-fellows/supergoose');
const server = require('../server.js')
const supergoose = require('../supergoose.js')
const auth = require('../src/auth/middleware.js')
const Users = require('../src/auth/users.schema.js')

const mockRequest = supergoose(server);


// POST to /signup to create a new user
// POST to /signin to login as a user (use basic auth)
// Need tests for auth middleware and the routes
// Does the middleware function (send it a basic header)
// Do the routes assert the requirements (signup/signin)
// This is going to require more “end to end” testing that you’ve done in the past
// To test signin, your tests actually need to create a user first, then try and login, so there’s a dependency built in

let errorObject = {'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unathorized'}

it('fails a login for a user with the incorrect basic credentials ', async ()=>{
    let req ={
        headers:{
            autorization: 'Basic YW46MTEx',
        },
    }
     let res ={};
     let next = jest.fn();

     await auth(req, res, next);

     expect(next).toHaveBeenCalledWith(errorObject);
})

// it('login for a user with the correct basic credentials ', async ()=>{
//     let req ={
//         headers:{
//             autorization: 'Basic aHVsazQ1OjM3MzczNw==',
//         },
//     }
//      let res ={};
//      let next = jest.fn();

//      await auth(req, res, next);

//      expect(next).toHaveBeenCalledWith();
// })


    it('can create() a new user', () => {
      let obj = {username:'Mouse', rassword:'1234', email:'ang@gmail.com', fullname:'Kat Shy', role:'user'};
      mockRequest.post(obj).then(results => {
      Object.keys(obj).forEach(key =>{
          expect(results[key]).toEqual(obj[key]);
      });
  });
});
  
