module.exports = async (policyContext, config, { strapi }) => {
  // console.log('policyContext: ', policyContext.state);
  // console.log('config: ', config);
  // console.log('strapi: ', strapi)
  return true;
  if (policyContext.state.user.role.name === 'Administrator') {
    // Go to next policy or will reach the controller's action.
    return true;
  }

  return false;
};
