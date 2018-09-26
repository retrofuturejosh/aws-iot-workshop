const aws = require('aws-sdk');
const fs = require('fs');

const { success, errorRes } = require('../services/responseBuilder');
const IotDataService = require('../services/iotData');

const host = fs.readFileSync('./src/host').toString('utf-8');
const iotdata = new aws.IotData({
  endpoint: host,
  region: 'us-east-1'
});

const iotDataService = new IotDataService(iotdata);

exports.handler = async (event, context) => {
  return await handleLogic(event);
};

async function handleLogic(event) {
  console.log('Event is \n', JSON.stringify(event));
  let thingName = event.pathParameters.deviceID;
  console.log(`Getting state of ${thingName}`);
  let shadow = await iotDataService.getThingShadow(thingName);
  console.log('full thing shadow is ', shadow);
  let res = shadow.state.reported;
  return success(JSON.stringify(res)).getResponse();
}
