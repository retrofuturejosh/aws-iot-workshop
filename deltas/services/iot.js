const { logGreenDim, logRed } = require('./chalk.js');

class IoTService {
  constructor(iot) {
    this.iot = iot;
  }

  /**
   * creates an iot thing
   * @param {string} thingName - name of thing to be created
   * @param {object}  attributes - (optional) object of attributes for thing. e.g. { watts: '100', lumens: '1100' }
   */
  createThing(thingName, attributes) {
    let thingParams = {
      thingName
    };

    if (attributes) {
      thingParams.attributePayload = { attributes };
    }

    return this.iot
      .createThing(thingParams)
      .promise()
      .then(res => {
        logGreenDim(`Successfully created thing: ${JSON.stringify(res)}`);
        return res;
      })
      .catch(err => {
        logRed(`failed to create thing: \n ${err} \n ${err.stack}`);
      });
  }

  /**
   * creates iot keys and certificate
   * @param {boolean} active - setAsActive prop
   */
  createKeysCert(active = true) {
    const params = {
      setAsActive: active
    };
    return this.iot
      .createKeysAndCertificate(params)
      .promise()
      .then(res => {
        logGreenDim(`Successfully created keys: ${JSON.stringify(res)}`);
        return res;
      })
      .catch(err => {
        logRed(`failed to create keys: \n ${err} \n ${err.stack}`);
      });
  }

  /**
   * Attaches certificate to thing
   * @param {string} principal - certificate arn
   * @param {string} thingName - name of thing
   */
  attachThingPrincipal(principal, thingName) {
    const params = {
      principal,
      thingName
    };
    return this.iot
      .attachThingPrincipal(params)
      .promise()
      .then(res => {
        logGreenDim(
          `Successfully attached Thing Principal: ${JSON.stringify(res)}`
        );
        return res;
      })
      .catch(err => {
        logRed(`failed to attach thing principal: \n ${err} \n ${err.stack}`);
      });
  }

  /**
   * Creates necessary iot policy
   * @param {string} policyName - optional: name of policy
   * @param {object} policyDoc - optional: JSON policy document
   */
  createPolicy(policyName, policyDoc) {
    let policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: [
            'iot:Publish',
            'iot:Subscribe',
            'iot:Connect',
            'iot:Receive',
            'iot:GetThingShadow',
            'iot:DeleteThingShadow',
            'iot:UpdateThingShadow',
            'greengrass:AssumeRoleForGroup',
            'greengrass:CreateCertificate',
            'greengrass:GetConnectivityInfo',
            'greengrass:GetDeployment',
            'greengrass:GetDeploymentArtifacts',
            'greengrass:UpdateConnectivityInfo',
            'greengrass:UpdateCoreDeploymentStatus'
          ],
          Resource: ['*']
        }
      ]
    };
    let hash = (Math.random() + 1).toString(36).substring(7);
    let params = {
      policyDocument: JSON.stringify(policy) /* required */,
      policyName: `greengrassPolicy${hash}` /* required */
    };

    if (policyDoc) params.policyDocument = JSON.stringify(policyDoc);
    if (policyName) params.policyName = policyName;

    return this.iot
      .createPolicy(params)
      .promise()
      .then(res => {
        logGreenDim(`Successfully Created Policy: ${JSON.stringify(res)}`);
        return res;
      })
      .catch(err => {
        logRed(`failed to create policy: \n ${err} \n ${err.stack}`);
      });
  }

  /**
   *
   * @param {service} iot - instance of aws.iot()
   * @param {string} policyName - name of IAM policy
   * @param {strint} principal - arn of principal cert
   */
  attachPrincipalPolicy(policyName, principal) {
    const params = {
      policyName,
      principal
    };
    return this.iot
      .attachPrincipalPolicy(params)
      .promise()
      .then(res => {
        logGreenDim(
          `Successfully Attached principal policy: ${JSON.stringify(res)}`
        );
        return res;
      })
      .catch(err => {
        logRed(`failed to attach principal policy: \n ${err} \n ${err.stack}`);
      });
  }

  /**
   * returns endpoint for aws iot communication
   * @param {string} type - endpoint type, one of: `iot:Data`, `iot:CredentialProvider` and `iot:Jobs`
   */
  getIoTEndpoint(type = 'iot:Data') {
    var params = {
      endpointType: type
    };
    return this.iot
      .describeEndpoint(params)
      .promise()
      .then(res => {
        logGreenDim(`got endpoint: ${JSON.stringify(res)}`);
        return res;
      })
      .catch(err => {
        logRed(`failed to get endpoing: \n ${err} \n ${err.stack}`);
      });
  }
}

module.exports = {
  IoTService
};
