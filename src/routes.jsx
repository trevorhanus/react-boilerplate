import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// route components
// import AppContainer from '../../ui/containers/AppContainer.jsx';
// import AdminContainer from '../../ui/containers/AdminContainer.jsx';
import PublicContainer from './ui/containers/PublicContainer.jsx';
// import DevicesContainer from '../../ui/containers/DevicesContainer.jsx';
// import LinesContainer from '../../ui/containers/LinesContainer.jsx';
// import LineContainer from '../../ui/containers/LineContainer.jsx';
// import DeviceContainer from '../../ui/containers/DeviceContainer.jsx';
// import VirtualTapContainer from '../../ui/containers/VirtualTapContainer.jsx';
// import AdminDevicesContainer from '../../ui/containers/AdminDevicesContainer.jsx';
// import AuthPageHome from '../../ui/pages/AuthPageHome.jsx';
// import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
// import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
// import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
// import ProtectedPage from '../../ui/pages/ProtectedPage.jsx';
// import LinePage from '../../ui/pages/LinePage.jsx';

export const renderRoutes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={PublicContainer}>
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
