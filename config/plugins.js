module.exports = ({ env }) => ({
  'strapi-v5-plugin-populate-deep': {
    config: {
      defaultDepth: 10, // Default is 5
    }
  },
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
