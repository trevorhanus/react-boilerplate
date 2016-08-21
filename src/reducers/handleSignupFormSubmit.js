import { transaction } from 'mobx';
import awsConfig from '../aws.config.js';
import state from '../state';


export default function handleSignupFormSubmit(payload) {
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
    signupWithEmailAndPassword(email, password)
      .then(res => {

        console.log('RESPONSE FROM SIGNUP');
        console.log(res);
      })
      .catch(err => {
        state.authErrors.push({
          type: 'none',
          message: err.message
        });
      });
  }
}

function signupWithEmailAndPassword(email, password, cb) {
  AWSCognito.config.region = 'us-west-2';

  var poolData = {
    UserPoolId : 'us-west-2_DcemIgPzV',
    ClientId : '7ipmasjb1iiorqfn9f8ojltm82'
  };
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

  var attributeList = [];

  var dataEmail = {
      Name : 'email',
      Value : email
  };

  var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
  attributeList.push(attributeEmail);

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, null, function(err, result){
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
