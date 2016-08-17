import React from 'react';
import { observer } from 'mobx-react';
import {findIndex} from 'underscore';
import state from '../../state';
import dispatch from '../../dispatcher';
import FullscreenLayout from '../layouts/FullscreenLayout.jsx';
import { Link } from 'react-router';

@observer
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    dispatch({
      action: 'HANDLE_LOGIN_FORM_SUBMIT',
      email: this.refs.email.value,
      password: this.refs.password.value,
      router: this.context.router
    });
  }

  render() {
    const { authErrors } = state;
    const errorMessages = authErrors.map(error => error.message);
    const errorClass = type => {
      const isError = findIndex(authErrors, (error) => {
        return error.type === type;
      });
      return isError && 'error';
    }

    const content = (
      <div>
        <div className="wrapper-auth">
          <h1 className="title-auth">Sign In.</h1>
          <p className="subtitle-auth" >Signing in allows you to view private lists</p>
          <form onSubmit={this.onSubmit}>
            <div className="list-errors">
              {errorMessages.map(msg => (
                <div className="list-item" key={msg}>{msg}</div>
              ))}
            </div>
            <div className={`input-symbol ${errorClass('email')}`}>
              <input type="email" name="email" ref="email" placeholder="Your Email"/>
              <span className="icon-email" title="Your Email"></span>
            </div>
            <div className={`input-symbol ${errorClass('password')}`}>
              <input type="password" name="password" ref="password" placeholder="Password"/>
              <span className="icon-lock" title="Password"></span>
            </div>
            <button type="submit" className="btn-primary">Sign in</button>
          </form>
        </div>

        <Link to="/join" className="link-auth-alt">Need an account? Join Now.</Link>
      </div>
    );

    return <FullscreenLayout content={content}/>;
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object,
};
