"use strict";
// const jwt_decode = require("jwt-decode"); //npmpackage

module.exports = (config, {strapi}) => {
  return async (ctx, next) => {
    const bearerToken = ctx.request.headers['x-auth-token'];
    // const jwt = ctx.request.headers['authorization'];
    // console.log('x-auth-token: ', ctx.request.headers['x-auth-token']);
    // console.log('authorization: ', ctx.request.headers['authorization']);

    // let decoded = jwt_decode.jwtDecode(jwt.replace('Bearer', '').trim()); //data is what you sent in.

    // const userId = decoded.id;
    // const user = await strapi.query('admin::user').findOne({ where: { id: userId } })
    // console.log('user: ', user)

    // console.log('32131: ', await strapi.db.query("api::partner.partner").findOne({ populate: true, where: { admin_users: { $in: [userId], } } }))

    const apiTokenService = strapi.services['admin::api-token'];
    const accessKey = await apiTokenService.hash(bearerToken);
    const storedToken = await apiTokenService.getBy({accessKey: accessKey});
    // console.log('storedToken: ', storedToken)
    const isValid = !!storedToken && (storedToken.expiresAt === null || storedToken.expiresAt && storedToken.expiresAt < new Date());

    if (!isValid) {
      return ctx.unauthorized("This action is unauthorized.");
    }
    return next();
  }
};
