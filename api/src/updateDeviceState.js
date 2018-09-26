const { success, errorRes } = require('../services/responseBuilder');

exports.handler = async (event, context) => {
  return handleLogic(event);
};

function handleLogic(event) {
  console.log('Event is \n', JSON.stringify(event));
  return success('Method is working').getResponse();
}
