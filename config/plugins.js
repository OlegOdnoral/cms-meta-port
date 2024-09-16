module.exports = ({ env }) => ({
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 10, // Default is 5
    }
  },
  "custom-api": {
    enabled: true,
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
