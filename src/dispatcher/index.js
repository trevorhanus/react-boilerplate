import mobx from 'mobx';
import state from '../state';
import updateQuery from '../reducers/updateQuery.js';
import startPullingForDevice from '../reducers/startPullingForDevice.js';
import handleLoginFormSubmit from '../reducers/handleLoginFormSubmit.js';

const actions = {
  'UPDATE_QUERY': updateQuery,
  'START_PULLING_FOR_DEVICE': startPullingForDevice,
  'HANDLE_LOGIN_FORM_SUBMIT': handleLoginFormSubmit
};

export default function dispatch(payload) {
  const {action} = payload;

  // Could save the previous state here for undo
  console.log('state before: ', mobx.toJS(state));
  // Could log every action here
  console.log('dispatching action: ', payload);
  actions[action](payload);
}
