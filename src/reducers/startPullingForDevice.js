import Ajax from 'simple-ajax';
import state from '../state';


export default function startPullingForDevice(payload) {
  const {deviceId} = payload;

  getDevice(deviceId, pulses => {
    state.pulses = pulses;
  });

  // state.devicePullingIntervalHandle = setInterval((deviceId) => {
  //   getDevice(deviceId, device => {
  //     state.device = device;
  //   });
  // }, 1000);
}

function getDevice(deviceId, cb) {
  const ajax = new Ajax({
    url: 'https://ey801t22xi.execute-api.us-west-2.amazonaws.com/dev/devices/' + deviceId,
    method: 'GET',
    requestedWith: false,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'PkmPB9Hf7u2kU9048q3h01RYjEL51OJm3LpoSNNE'
    }
  });

  ajax.on('success', e => {
    const device = JSON.parse(e.currentTarget.response);
    cb(device.Item.pulses.N);
  });

  ajax.send();
}
