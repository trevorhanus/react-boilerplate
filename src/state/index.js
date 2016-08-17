import {observable} from 'mobx';

class state {
  // observable properties
  @observable searchQuery = '';
  @observable pulses = 0;
  @observable authErrors = [];

  devicePullingIntervalHandle = null;
}

export default new state();
