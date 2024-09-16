/**
 * A set of functions called "actions" for `partner-for-user`
 */

export default {
  exampleAction: async (ctx, next) => {
    // console.log(ctx.request.headers);
    // ctx.request.headers.origin
    console.log(ctx)
    try {
      ctx.body = 'ok';
      const data = await strapi
        .service("api::partner-for-user.partner-for-user")
        .exampleAction(ctx.request.headers.origin);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
