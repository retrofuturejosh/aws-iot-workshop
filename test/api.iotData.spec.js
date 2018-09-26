const { expect } = require('chai');
const aws = require('aws-sdk');

const IoTDataService = require('../api/services/iotData');
const expectedResults = require('./expectedResults');
const { stub } = require('sinon');

const iotdata = new aws.IotData({
  endpoint: 'my.host.tld',
  region: 'us-east-1'
});

describe('Class IoTData', () => {
  let getThingShadowStub, updateThingShadowStub, iotDataService;
  before(() => {
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
  });

  describe('Method: getThingShadow', () => {
    it('should return the current thingShadow', async () => {
      let expectedResult = JSON.parse(expectedResults.getThingShadowRes.payload);
      let result = await iotDataService.getThingShadow('myThing');
      expect(result).to.deep.equal(expectedResult);
    });
    it('should call getThingShadow method with correct params', () => {
      let calledWith = {
        thingName: 'myThing'
      };
      expect(getThingShadowStub.calledWithExactly(calledWith)).to.equal(true);
    });
  });

  describe('Method: updateThingShadow', () => {
    let newState = JSON.stringify({
      state: {
        desired: {
          isOn: true
        }
      }
    });
    it('should return the current thingShadow', async () => {
      let expectedResult = JSON.parse(expectedResults.updateThingShadowRes.payload);
      let result = await iotDataService.updateThingShadow('myThing', newState);
      expect(result).to.deep.equal(expectedResult);
    });
    it('should call getThingShadow method with correct params', () => {
      let calledWith = {
        payload: newState,
        thingName: 'myThing'
      };
      expect(updateThingShadowStub.calledWithExactly(calledWith)).to.equal(
        true
      );
    });
  });
});
