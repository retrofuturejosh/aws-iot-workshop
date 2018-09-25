const awsIot = require('aws-iot-device-sdk');
const fs = require('fs');

const endpoint = fs.readFileSync('./certs/host').toString('utf-8');
const thingShadow = awsIot.thingShadow({
  keyPath: 'certs/key.pem',
  certPath: 'certs/cert.pem',
  caPath: 'certs/root-CA.pem',
  clientId: 'DemoClient',
  host: endpoint
});

function listenForDeltas() {
  thingShadow.register('myLight', () => {
    console.log('registered myLight');
  });
  thingShadow.on('delta', (thingName, stateObject) => {
    console.log(
      `received delta on ${thingName}: \n`,
      JSON.stringify(stateObject)
    );
    resolveDelta(thingName, stateObject.state);
  });
}

function resolveDelta(thing, updatedState) {
  let newState = { state: { reported: updatedState } };
  let token = thingShadow.update(thing, newState);
  console.log('updated state');
}

listenForDeltas();

// This is a handler which does nothing for this example
exports.handler = function handler(event, context) {
  console.log(event);
  console.log(context);
};

