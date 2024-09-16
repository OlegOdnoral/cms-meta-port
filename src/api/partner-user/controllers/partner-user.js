'use strict';

/**
 * A set of functions called "actions" for `partner-by-user`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    const { user } = ctx.state;
    // console.log(ctx);
    console.log('user: ', user)
    try {
      ctx.body = { data: 'ok' };
    } catch (err) {
      ctx.body = err;
    }
  }
};
