class ResponseBuilder {
  constructor(statusCode, body) {
    this.response = {
      statusCode,
      body
    };
  }

  /**
   * returns formatted HTTP response
   */
  getResponse() {
    return this.response;
  }

  /**
   * adds a custom header to response
   * @param {string} headerName
   * @param {string} headerValue
   */
  addHeader(headerName, headerValue) {
    this.response.headers
      ? (this.response.headers[headerName] = headerValue)
      : (this.response.headers = { [headerName]: headerValue });
    return this;
  }

  /**
   * adds property 'isBase64Encoded' to response with bool as value
   * @param {boolean} bool
   */
  base64(bool) {
    this.response.isBase64Encoded = bool;
    return this;
  }
}

/**
 * returns an instance of ResponseBuilder with HTTP 200 response
 * use method 'getResponse' to get the final res object
 * @param {string} body
 */
function success(body) {
  return new ResponseBuilder(200, body);
}

/**
 * returns an instance of ResponseBuilder with custom HTTP response
 * use method 'getResponse' to get the final res object
 * @param {integer} statusCode
 * @param {string} message
 */
function errorRes(statusCode, message) {
  return new ResponseBuilder(statusCode, message);
}

module.exports = {
  success,
  errorRes
};
