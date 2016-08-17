import React from 'react';
import {observer} from "mobx-react";
import dispatch from '../../dispatcher';
import state from '../../state';

@observer
export default class UnauthAppLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {

  }

  updateQuery(e) {
    const newQuery = e.target.value;
    dispatch({
      action: 'UPDATE_QUERY',
      query: newQuery
    });
  }

  render() {
    const {
      connected,
      children,
      location
    } = this.props;

    const {searchQuery} = state;

    return (
      <div id="container">
        <div id="content-container" className="full-screen">
          {children}
          <div>
            <input type="text" value={searchQuery} onChange={this.updateQuery} />
          </div>
        </div>
      </div>
    );
  }
}

UnauthAppLayout.propTypes = {
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

UnauthAppLayout.contextTypes = {
  router: React.PropTypes.object,
};
