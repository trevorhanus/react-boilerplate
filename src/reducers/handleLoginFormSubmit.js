import { transaction } from 'mobx';
import awsConfig from '../aws.config.js';
import state from '../state';

export default function handleLoginFormSubmit(payload) {
  const {email, password, router} = payload;
  let isError = false;

  // Use a transaction here so any observers to state.authErrors
  // will only get called once
  transaction(() => {
    // Empty the authErrors
    state.authErrors.length = 0;

    if (!email) {
      state.authErrors.push({
        type: 'email',
        message: 'Email required'
      });
    }

    if (!password) {
      state.authErrors.push({
        type: 'password',
        message: 'Password required'
      });
    }

    if (state.authErrors.length > 0) {
      isError = true;
    }
  });

  if (!isError) {
    // Login with AWS Cognito
    loginWithEmailAndPassword(email, password)
      .then(res => {
        console.log('RESPONSE FROM LOGIN');
        console.log(res);
        console.log('access token + ' + res.getAccessToken().getJwtToken());
      })
      .catch(err => {
        handleLoginError(err, router);
      });
  }
}

function loginWithEmailAndPassword(email, password) {
  AWSCognito.config.region = 'us-west-2';

  const authenticationData = {
    Username: email,
    Password: password
  };
  const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

  const poolData = {
    UserPoolId : 'us-west-2_DcemIgPzV',
    ClientId : '7ipmasjb1iiorqfn9f8ojltm82'
  };
  const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

  const userData = {
      Username : email,
      Pool : userPool
  };

  const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        resolve(result);
      },
      onFailure: err => {
        reject(err);
      }
    });
  });
}

function handleLoginError(err, router) {
  if (err.message === 'User is not confirmed.') {
    console.log('need to send you to the confirmation page.');
    router.push('/confirm?login=true');
  } else {
    state.authErrors.push({
      type: 'none',
      message: err.message
    });
  }
}
