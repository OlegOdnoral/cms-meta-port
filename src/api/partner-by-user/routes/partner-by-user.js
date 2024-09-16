'use strict';


module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/partner-by-user',
     handler: 'partner-by-user.exampleAction',
     config: {
       policies: [/*'global::is-admin'*/],
       middlewares: ['global::is-auth'],
       auth: false
     },
    },
  ],
};
