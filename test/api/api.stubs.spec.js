const aws = require('aws-sdk');
const IoTDataService = require('../../api/services/iotData');
const expectedResults = require('./expectedResults');
const { stub } = require('sinon');

const iotdata = new aws.IotData({
  endpoint: 'my.host.tld',
  region: 'us-east-1'
});

let getThingShadowStub, updateThingShadowStub, iotDataService;

// mock service
getThingShadowStub = stub(iotdata, 'getThingShadow');
getThingShadowStub.returns({
  promise: () => {
    return Promise.resolve(expectedResults.getThingShadowRes);
  }
});
updateThingShadowStub = stub(iotdata, 'updateThingShadow');
updateThingShadowStub.returns({
  promise: () => {
    return Promise.resolve(expectedResults.updateThingShadowRes);
  }
});
//start service
iotDataService = new IoTDataService(iotdata);

module.exports = {
  iotDataService,
  getThingShadowStub,
  updateThingShadowStub
}
