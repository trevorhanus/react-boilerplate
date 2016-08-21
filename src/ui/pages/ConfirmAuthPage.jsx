import React from 'react';
import { observer } from 'mobx-react';
import {findIndex} from 'underscore';
import state from '../../state';
import dispatch from '../../dispatcher';
import FullscreenLayout from '../layouts/FullscreenLayout.jsx';
import { Link } from 'react-router';

@observer
export default class ConfirmAuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    dispatch({
      action: 'HANDLE_CONFIRM_AUTH_FORM_SUBMIT',
      code: this.refs.code.value,
      router: this.context.router
    });
  }

  resendCode() {
    console.log('resending code...');
  }

  title() {
    // get query paramters from url
    const {query} = this.props.location;
    return query && query.login ? 'You must confirm your account.': 'Confirmation Code.';
  }

  render() {
    const { authErrors } = state;
    const title = this.title.bind(this);
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
          <h1 className="title-auth">{title()}</h1>
          <p className="subtitle-auth" >Enter the your 6 digit confirmation code.</p>
          <form onSubmit={this.onSubmit}>
            <div className="list-errors">
              {errorMessages.map(msg => (
                <div className="list-item" key={msg}>{msg}</div>
              ))}
            </div>
            <input type="text" className="center" maxLength="6" name="code" ref="code" placeholder="######"/>
            <button type="submit" className="btn-primary">Confirm</button>
          </form>
        </div>

        <div className="link-auth-alt" onClick={this.resendCode}>Lost code? Send a new code.</div>
        <Link to="/join" className="link-auth-alt">Need an account? Join Now.</Link>
      </div>
    );

    return <FullscreenLayout content={content}/>;
  }
}

ConfirmAuthPage.contextTypes = {
  router: React.PropTypes.object,
};
