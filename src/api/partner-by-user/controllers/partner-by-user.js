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
    const user = await strapi.query('admin::user').findOne({populate: true, where: {id: userId}})

    // content-type-builder
    // console.log('dawda: ', await strapi.query('admin::permission').findMany())

    const userRole = user.roles[0].id;
    const role = await strapi.db.query('admin::role').findMany({populate: true, where: {id: userRole}});

    const mapData = new Map();

    const perms = role[0].permissions
      .filter(row => !!row.subject)
      .map(({subject}) => subject.split('.')[1])
      .filter((item, pos, self) => self.indexOf(item) == pos)
      .map(row => row.replaceAll('-', '_'))
      .forEach(row => mapData.set(row, true));

    const obj = Object.fromEntries(mapData);


    console.log('perms: ', perms)

    console.log('dawda: ', obj)

    // TODO: Зависимости должны называть так же как и таблицы что бы работала логика получения доступов
    // console.log('findMany: ', strapi.query("api::content-manager"))

    // const settings = await strapi.entityService.findMany("api::partner.partner", {
    //   populate: '*',
    //   filters: { admin_users: { $in: [user.id], } },
    // })
    // console.log('lol: ', settings)

    // // console.log(user)
    // const settings = await strapi.documents("api::partner.partner").findOne({
    //   where: {id: [user.id]}
    // });
    //
    // console.log(settings)

    // admin_users, createdBy, partner_config

    const res = await strapi.db
      .query("api::partner.partner")
      .findOne({
        populate: {
          ...obj,
          ...{parnter_localization: {populate: ['locale']}},
          ...{partner_config: { populate: true }},
          ...{footer_config: { populate: true }},
          ...{footer_content: { populate: true }}
        },
        where: {admin_users: {$in: [user.id],}}
      })

    // const settings = await strapi.documents('api::partner.partner').findOne({
    //   documentId: res.documentId,
    //   populate: "*"
    // })


    // console.log(ctx);
    // console.log('user: ', user)
    try {
      ctx.body = {data: res};
    } catch (err) {
      ctx.body = err;
    }
  }
};
