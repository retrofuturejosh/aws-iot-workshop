const { expect } = require('chai');

const { handleLogic } = require('../../api/src/updateDeviceState');
const { iotDataService, updateThingShadowStub } = require('./api.stubs.spec');

describe('API PUT /device/{deviceId}', () => {
  describe('handleLogic function', () => {
    let res;
    before(async () => {
      let event = {
        pathParameters: { deviceID: 'myDevice' },
        body: JSON.stringify({ isOn: true })
      };
      res = await handleLogic(event, iotDataService);
    });
    it('returns 200 on a successful PUT', () => {
      expect(res.statusCode).to.equal(200);
    });
    it('returns the update metadata in the body of the response', () => {
      expect(res.body).to.deep.equal(
        JSON.stringify({
          state: { desired: { isOn: true } },
          metadata: { desired: { isOn: { timestamp: 1537994955 } } },
          version: 2,
          timestamp: 1537994955
        })
      );
    });
  });
});
