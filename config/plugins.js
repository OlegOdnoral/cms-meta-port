module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      routes: [
        {
          method: "POST",
          path: "/auth/local/register",
          handler: "Auth.register",
          config: {
            policies: [],
            middlewares: [],
          },
        },
      ],
    },
  },
});
