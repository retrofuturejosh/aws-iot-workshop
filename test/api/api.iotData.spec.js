const { expect } = require('chai');

const {
  iotDataService,
  getThingShadowStub,
  updateThingShadowStub
} = require('./api.stubs.spec');
const expectedResults = require('./expectedResults');

describe('Class IoTData', () => {
  describe('Method: getThingShadow', () => {
    it('should return the current thingShadow', async () => {
      let expectedResult = JSON.parse(
        expectedResults.getThingShadowRes.payload
      );
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
      let expectedResult = JSON.parse(
        expectedResults.updateThingShadowRes.payload
      );
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
