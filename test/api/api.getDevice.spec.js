const { expect } = require('chai');

const { handleLogic } = require('../../api/src/getDevice');
const {
  iotDataService,
  getThingShadowStub
} = require('./api.stubs.spec');

describe('API GET /device/{deviceId}', () => {
  describe('handleLogic function', () => {
    let res;
    before(async () => {
      let event = { pathParameters: { deviceID: 'myDevice' } };
      res = await handleLogic(event, iotDataService);
    });
    it('returns 200 on a successful response', () => {
      expect(res.statusCode).to.equal(200);
    });
    it('returns the reported state in the body of the response', () => {
      expect(res.body).to.deep.equal(
        JSON.stringify({ welcome: 'aws-iot' })
      );
    });
  });
});
