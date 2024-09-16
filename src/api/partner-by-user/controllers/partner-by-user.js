'use strict';
const jwt_decode = require("jwt-decode"); //npmpackage
/**
 * A set of functions called "actions" for `partner-by-user`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    const jwt = ctx.request.headers['authorization'];
    let decoded = jwt_decode.jwtDecode(jwt.replace('Bearer', '').trim()); //data is what you sent in.

    const userId = decoded.id;
    const user = await strapi.query('admin::user').findOne({ populate: true, where: { id: userId } })

    // content-type-builder
    // console.log('dawda: ', await strapi.query('admin::permission').findMany())

    const userRole = user.roles[0].id;
    const role = await strapi.db.query('admin::role').findMany({ populate: true, where: { id: userRole } });

    const mapData = new Map();

    const perms =  role[0].permissions
      .filter(row => !!row.subject)
      .map(({ subject }) => subject.split('.')[1])
      .filter((item, pos, self) => self.indexOf(item) == pos)
      .map(row => row.replaceAll('-', '_'))
      .forEach(row => mapData.set(row, true));

    const obj = Object.fromEntries(mapData);


    console.log('dawda: ', obj)

    // console.log('findMany: ', strapi.query("api::content-manager"))
    const settings = await strapi.db
      .query("api::partner.partner")
      .findOne({ populate: { ...obj }, where: { admin_users: { $in: [user.id], } } })


    // console.log(ctx);
    // console.log('user: ', user)
    try {
      ctx.body = { data: settings };
    } catch (err) {
      ctx.body = err;
    }
  }
};
