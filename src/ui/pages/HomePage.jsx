import React from 'react';
import FullscreenLayout from '../layouts/FullscreenLayout.jsx';
import { Link } from 'react-router';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const content = (
      <div className="wrapper-auth">
        <h1 className="title-auth">Kegwatch</h1>
        <p className="subtitle-auth" >Monitor your restaurant in real-time</p>
        <div className="button-group">
          <Link to="/signup">
            <button type="submit" className="btn-primary">Sign up</button>
          </Link>
          <Link to="/login">
            <button type="submit" className="btn-primary">Log in</button>
          </Link>
        </div>
      </div>
    );

    return <FullscreenLayout content={content} />;
  }
}

HomePage.contextTypes = {
  router: React.PropTypes.object,
};
