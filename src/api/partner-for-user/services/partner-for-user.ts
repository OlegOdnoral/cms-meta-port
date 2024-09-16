/**
 * partner-for-user service
 */

export default () => ({
  exampleAction: async (partner_host: string) => {
    console.log('origin', partner_host)

    try {

      const entries = await strapi.db
        .query("api::partner.partner")
        .findMany({
          select: ['*'],
          where: { partner_host },
          // populate: true
          populate: { buisness_parnter: true, supported_locales: true }
        })
        // .findOne({
        //   select: ['*'],
        //   where: {
        //     $and: [
        //       { partner_host },
        //       {
        //         publishedAt: { $not: { $eq: null } }
        //       }
        //     ]
        //   },
        //   populate: { buisness_parnter: true, supported_locales: true }
        // })

      // const entries = await strapi.entityService.findOne(
      //   "api::buisness-parnter-setting.buisness-parnter-setting", partner_host
      // );
      console.log(entries);
      return entries
    } catch (e) {
      console.log(e);
    }

    return {}
  }
});
