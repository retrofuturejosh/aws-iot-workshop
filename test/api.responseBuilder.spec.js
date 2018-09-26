const { expect } = require('chai');

const { success, errorRes } = require('../api/services/responseBuilder');

describe('success response builder function', () => {
  it('Build a properly formatted 200 response', () => {
    let expectedRes = {
      statusCode: 200,
      body: 'Success'
    };
    let response = success('Success').getResponse();
    expect(response).to.deep.equal(expectedRes);
  });
  it('Can add a custom header', () => {
    let expectedRes = {
      statusCode: 200,
      body: 'Success',
      headers: {
        myHeader: 'Hooray'
      }
    };
    let response = success('Success')
      .addHeader('myHeader', 'Hooray')
      .getResponse();
    expect(response).to.deep.equal(expectedRes);
  });
  it('Can add multiple headers', () => {
    let expectedRes = {
      statusCode: 200,
      body: 'Success',
      headers: {
        myHeader: 'Hooray',
        anotherOne: 'BooYa'
      }
    };
    let response = success('Success')
      .addHeader('myHeader', 'Hooray')
      .addHeader('anotherOne', 'BooYa')
      .getResponse();
    expect(response).to.deep.equal(expectedRes);
  });
  it('can add base64 encoding property', () => {
    let expectedRes = {
      statusCode: 200,
      body: 'Success',
      isBase64Encoded: true
    };
    let response = success('Success')
      .base64(true)
      .getResponse();
    expect(response).to.deep.equal(expectedRes);
  });
});
describe('errorRes response builder function', () => {
  it('Build a properly formatted 400 response', () => {
    let expectedRes = {
      statusCode: 400,
      body: 'Server Error'
    };
    let response = errorRes(400, 'Server Error').getResponse();
    expect(response).to.deep.equal(expectedRes);
  });
});
