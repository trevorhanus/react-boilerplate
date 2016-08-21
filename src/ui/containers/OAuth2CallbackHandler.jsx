import React from 'react';
import { observer } from 'mobx-react';
import dispatch from '../../dispatcher';
import state from '../../state';
import parseQueryString from '../../utils/parseQueryString.js';

export default class OAuth2CallbackHandler extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const {hash} = this.props.location;
    const params = parseQueryString(hash.substring(1));
    const {access_token, token_type, state, expires_in} = params;

    if (params.error && params.error === 'access_denied') {
      alert('Access was denied. Try again.');
    }

    this.getAWSCredentials(access_token);
  }

  getAWSCredentials(access_token) {
    var cognitoidentity = new AWS.CognitoIdentity({
      region: 'us-west-2'
    });
    const params = {
      IdentityPoolId: 'us-west-2:DcemIgPzV',
      AccountId: '146209622952',
      Logins: {
         'accounts.google.com': access_token
      }
    };
    cognitoidentity.getId(params, (err, data) => {
      if (err) {
        alert(err);
      } else {
        console.log(data);
      }
    });

    /*
    // Add the Google access token to the Cognito credentials login map.
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
       IdentityPoolId: 'us-west-2_DcemIgPzV',
       Logins: {
          'accounts.google.com': access_token
       }
    });

    // Obtain AWS credentials
    AWS.config.credentials.get(function(){
       // Access AWS resources here.
       console.log('WE ARE LOGGED IN!!');
    });
    */
  }

  render() {

    return (
      <div>
        One moment... Logging in with Google...
      </div>
    );
  }
}

OAuth2CallbackHandler.contextTypes = {
  router: React.PropTypes.object.isRequired
}
