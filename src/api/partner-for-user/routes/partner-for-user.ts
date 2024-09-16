export default {
  routes: [
    {
     method: 'GET',
     path: '/partner-for-user',
     handler: 'partner-for-user.exampleAction',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
