import { Switch, Route } from 'react-router-dom';
import React from 'react';
import HomePage from '../pages/Landing/HomePage';
import ChatRoomContainer from '../containers/ChatRoomContainer';
import LoginPage from '../pages/users/LoginPage';
import RegisterPage from '../pages/users/RegisterPage';
import ProfilePage from '../pages/users/ProfilePage';
import AboutPage from '../pages/Landing/AboutPage';

function Routes({ token, setToken }) {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/register' component={RegisterPage} />
      <Route
        path='/login'
        component={() => <LoginPage setToken={setToken} token={token} />}
      />
      <Route path='/profile' component={ProfilePage} token={token} />

      <Route
        exact
        path='/chatrooms'
        component={ChatRoomContainer}
        token={token}
      />
      <Route exact path='/about' component={AboutPage} />
    </Switch>
  );
}

export default Routes;
