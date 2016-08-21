import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// route components
import UnauthedAppContainer from './ui/containers/UnauthedAppContainer.jsx';
import OAuth2CallbackHandler from './ui/containers/OAuth2CallbackHandler.jsx';
import HomePage from './ui/pages/HomePage.jsx';
import LoginPage from './ui/pages/LoginPage.jsx';
import SignupPage from './ui/pages/SignupPage.jsx';
import ConfirmAuthPage from './ui/pages/ConfirmAuthPage.jsx';

export const renderRoutes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={UnauthedAppContainer}>
        <IndexRoute component={HomePage}/>
        <Route path="oauth2callback" component={OAuth2CallbackHandler}/>
        <Route path="signup" component={SignupPage}/>
        <Route path="login" component={LoginPage}/>
        <Route path="confirm" component={ConfirmAuthPage}/>
      </Route>
    </Router>
  );
}

/*
export const renderRoutes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={PublicContainer}>
        <IndexRoute component={AuthPageHome}/>
        <Route path="signin" component={AuthPageSignIn}/>
        <Route path="join" component={AuthPageJoin}/>
        <Route path="virtualtap" component={VirtualTapContainer}/>
      </Route>
      <Route path="/app" component={AppContainer}>
        <Route path="lines" component={LinesContainer} name="Lines"/>
        <Route path="lines/:lineId" component={LineContainer} name="Line"/>
        <Route path="devices" component={DevicesContainer} name="Devices"/>
        <Route path="devices/:deviceId" component={DeviceContainer} name="Device"/>
      </Route>
      <Route path="/admin" component={AdminContainer}>
        <Route path="devices" component={AdminDevicesContainer} name="Devices"/>
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Router>
  );
}
*/
