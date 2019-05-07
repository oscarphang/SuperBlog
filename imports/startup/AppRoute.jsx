import React from 'react';
import { Router, Route, Switch,Redirect } from 'react-router';
import NotFoundPage from '../ui/pages/auth/NotFound';
import History from './History';
import {Main as AuthMain} from '../ui/pages/auth/Main';
import Profile from '../ui/pages/users/Profile';
import UserList from '../ui/pages/users/UserList';
import MyProfile from '../ui/pages/users/MyProfile';
import AppContainer from '../ui/layouts/AppContainer';

export const AppRoute = () => (
  <Router history={History}>
    <Switch>
      {/* <Route exact path="/" component={AppContainer}/>
      <Route exact path="/login" component={ListPageContainer}/>
      <Route exact path="/signin" component={AuthPageSignIn}/>
      <Route exact path="/join" component={AuthPageJoin}/> */}
      <Redirect exact path="/" to="/auth/login"></Redirect>
      <Route exact path="/user-profile/:id" component={Profile}/>
      <Route exact path="/users" component={UserList}/>
      <Route exact path="/my-profile" component={MyProfile}/>
      <Route path="/auth" component={AuthMain}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
);