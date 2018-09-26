module.exports = {
  getThingShadowRes: {
    payload: JSON.stringify({
      state: {
        desired: { welcome: 'aws-iot' },
        reported: { welcome: 'aws-iot' }
      },
      metadata: {
        desired: { welcome: { timestamp: 1537983484 } },
        reported: { welcome: { timestamp: 1537983484 } }
      },
      version: 1,
      timestamp: 1537993775
    })
  },
  updateThingShadowRes: {
    payload: JSON.stringify({
      state: { desired: { isOn: true } },
      metadata: { desired: { isOn: { timestamp: 1537994955 } } },
      version: 2,
      timestamp: 1537994955
    })
  }
};
