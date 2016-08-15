import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class Public extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {

  }

  render() {
    const {
      connected,
      children,
      location
    } = this.props;

    return (
      <div id="container">
        <div id="content-container" className="full-screen">
          {children}
        </div>
      </div>
    );
  }
}

Public.propTypes = {
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

Public.contextTypes = {
  router: React.PropTypes.object,
};
