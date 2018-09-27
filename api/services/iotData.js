class IoTDataService {
  constructor(iotData) {
    this.iotData = iotData;
  }

  async getThingShadow(thingName) {
    const params = {
      thingName
    }
    let res = await this.iotData.getThingShadow(params).promise();
    return JSON.parse(res.payload);
  }

  async updateThingShadow(thingName, newState) {
    const params = {
      payload: newState,
      thingName
    };
    let res = await this.iotData.updateThingShadow(params).promise();
    return JSON.parse(res.payload);
  }
}

module.exports = IoTDataService;
