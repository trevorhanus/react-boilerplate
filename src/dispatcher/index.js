import * as reducers from '../reducers/index.js';

const actions = {
  'get_stuff': reducers.getStuff,
  'open_menu': reducers.openMenu
};

export default class dispatcher {
  constructor() {
    this.actions = actions;
  }

  do(action, params) {
    this.actions[action](params);
  }
}
