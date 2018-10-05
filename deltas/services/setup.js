const AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');
const iot = new AWS.Iot({ apiVersion: '2015-05-28', region: 'us-east-1' });

const { IoTService } = require('./iot');

let iotService = new IoTService(iot);

async function runSetup() {
  // let certRes = await iotService.createKeysCert();
  // let key = certRes.keyPair.PrivateKey;
  // let cert = certRes.certificatePem;
  // let certArn = certRes.certificateArn;
  // console.log('Current working directory is ', process.cwd());
  fs.mkdirSync('./certs');
  // fs.writeFileSync('./certs/key.pem', key);
  // fs.writeFileSync('./certs/cert.pem', cert);
  // let policy = await iotService.createPolicy();
  // let attachPolicy = await iotService.attachPrincipalPolicy(
  //   policy.policyName,
  //   certArn
  // );
  let rootCA = await getCARoot();
  fs.writeFileSync('./certs/root-CA.pem', rootCA);
  let hostSetup = await iotService.getIoTEndpoint();
  fs.writeFileSync('./certs/host', hostSetup.endpointAddress);
}

async function getCARoot() {
  try {
    let caRes = await axios.get(
      'https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem'
    );
    let rootCA = caRes.data;
    console.log('successfully got ca-root');
    return rootCA;
  } catch (err) {
    console.log('error getting ca root', err, err.stack);
  }
}

runSetup();

module.exports = {
  runSetup
};
