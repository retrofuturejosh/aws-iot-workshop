const aws = require('aws-sdk');
const fs = require('fs');

const { success, errorRes } = require('../services/responseBuilder');
const IotDataService = require('../services/iotData');

const handler = async (event, context) => {
  const host = fs.readFileSync('./src/host').toString('utf-8');
  const iotdata = new aws.IotData({
    endpoint: host,
    region: process.env.AWS_REGION
  });
  const iotDataService = new IotDataService(iotdata);
  return await handleLogic(event, iotDataService);
};

async function handleLogic(event, iotDataService) {
  console.log('Event is \n', JSON.stringify(event));
  let thingName = event.pathParameters.deviceID;
  let body = JSON.parse(event.body);
  console.log(`Desired state of ${thingName} is :`, event.body);
  let newState = JSON.stringify({ state: { desired: body } });
  let res = await iotDataService.updateThingShadow(thingName, newState);
  console.log('Update response is ', res);
  return success(JSON.stringify(res)).getResponse();
}

module.exports = {
  handler,
  handleLogic
};
