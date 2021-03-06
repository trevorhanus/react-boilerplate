import React from 'react';
import Public from '../layouts/Public.jsx';

export default class PublicContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children} = this.props;

    return (
      <div className="container">
        {children}
      </div>
    );
  }
}
