import React from 'react';
import { Router, Route, Switch,Redirect } from 'react-router';
import NotFoundPage from '../ui/pages/auth/NotFound';
import History from './History';
import UserProfile from '../ui/pages/users/UserProfile';
import UserList from '../ui/pages/users/UserList';
import MyProfile from '../ui/pages/users/MyProfile';
import AppContainer from '../ui/layouts/AppContainer';
import Login from '../ui/pages/auth/Login';
import Register from '../ui/pages/auth/Register';
import VerifyEmail from '../ui/pages/auth/VerifyEmail';
import ForgotPassword from '../ui/pages/auth/ForgotPassword';
import ResetPassword from '../ui/pages/auth/ResetPassword';

export const RoutesMap = new Map([
  [UserProfile,'/admin/user/:id'],
  [UserList,'/admin/users'],
  [MyProfile,'/my-profile'],
  [ResetPassword,'/reset-password/:token'],
  [ForgotPassword,'/forgot-password'],
  [VerifyEmail,'/verify-email/:token'],
  [Register,'/signup'],
  [Login,'/login'],
  ["AFTER_LOGIN",'/my-profile'],
]);


export const AppRoute = () => (
  <Router history={History}>
    <Switch>
      {/* <Route exact path="/" component={AppContainer}/>
      <Route exact path="/login" component={ListPageContainer}/>
      <Route exact path="/signin" component={AuthPageSignIn}/>
      <Route exact path="/join" component={AuthPageJoin}/> */}


      //auth
      <Redirect exact path="/" to={RoutesMap.get(Login)}></Redirect>
      <Route exact path={RoutesMap.get(ResetPassword)} component={ResetPassword}/>
      <Route exact path={RoutesMap.get(ForgotPassword)} component={ForgotPassword}/>
      <Route exact path={RoutesMap.get(VerifyEmail)} component={VerifyEmail}/>
      <Route exact path={RoutesMap.get(Register)} component={Register}/>
      <Route exact path={RoutesMap.get(Login)} component={Login}/>

      //admin
      <Route exact path={RoutesMap.get(UserProfile)} component={UserProfile}/>
      <Route exact path={RoutesMap.get(UserList)} component={UserList}/>
      <Route exact path={RoutesMap.get(MyProfile)} component={MyProfile}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
);