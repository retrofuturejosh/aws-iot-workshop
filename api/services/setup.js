const AWS = require('aws-sdk');
const fs = require('fs');
const iot = new AWS.Iot({ apiVersion: '2015-05-28', region: 'us-east-1' });

const { IoTService } = require('../services/iot');

let iotService = new IoTService(iot);

async function runSetup() {
  let hostSetup = await iotService.getIoTEndpoint();
  fs.writeFileSync('./src/host', hostSetup.endpointAddress);
}

runSetup();
