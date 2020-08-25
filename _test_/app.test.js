'use strict';

require('@code-fellows/supergoose');
const auth = require('../src/auth/middleware.js')
const Users = require('../src/auth/users.schema.js')

let errorObject = {'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unathorized'}

it('fails ', async ()=>{
    let req ={
        headers:{
            autorization: 'Basic jffbvhsbvl',
        },
    }
     let res ={};
     let next = jest.fn();

     await auth(req, res, next);

     expect(next).toHaveBeenCalledWith(errorObject);
})

// it('fails ', async ()=>{
//     let req ={
//         headers:{
//             autorization: 'Basic jffbvhsbvl',
//         },
//     }
//      let res ={};
//      let next = jest.fn();

//      await auth(req, res, next);

//      expect(next).toHaveBeenCalledWith(errorObject);
// })