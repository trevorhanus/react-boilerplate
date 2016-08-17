import { transaction } from 'mobx';
import AWS from '../aws-sdk/aws-sdk-2.5.1.js';
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
    loginWithEmailAndPassword(email, password, (err) => {
      if (err) {
        state.authErrors.push({
          type: 'none',
          message: err.reason
        });
      } else {
        console.log('successful!');
        // router.push('/app/lines');
      }
    });
  }
}

function loginWithEmailAndPassword(email, password, cb) {

  const cognitoidentity = new AWS.CognitoIdentity({
    apiVersion: awsConfig.cognitoApiVersion,
    region: awsConfig.region
  });

  const poolData = {
    UserPoolId : awsConfig.cognitoUserPoolId,
    ClientId : awsConfig.cognitoClientId
  };

  const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

  var attributeList = [];

  const dataEmail = {
      Name : 'email',
      Value : email
  };

  var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

  attributeList.push(attributeEmail);

  userPool.signUp(email, password, attributeList, null, function(err, result){
    if (err) {
      console.log('error: ', err);
      cb(err);
    } else {
      state.cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
    }
  });
}
