import React from 'react';
import { observer } from 'mobx-react';
import dispatch from '../../dispatcher';
import state from '../../state';

@observer
export default class OuncesPouredContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    dispatch({
      action: 'START_PULLING_FOR_DEVICE',
      deviceId: 'Jq8Lj7hcJrYJTfkT3'
    });
  }

  componentWillUnmount() {
    dispatch({
      action: 'STOP_PULLING_FOR_DEVICE'
    });
  }

  render() {
    const {pulses} = state;

    return (
      <div className="ouncesPoured">
        {Math.round(pulses / 79.7)} Ounces Poured
      </div>
    );
  }
}
