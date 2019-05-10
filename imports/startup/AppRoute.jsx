import React from 'react';
import { Router, Route, Switch,Redirect } from 'react-router';
import NotFoundPage from '../ui/pages/auth/NotFound';
import PermissionDenied from '../ui/pages/auth/PermissionDenied';
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
import PostList from '../ui/pages/posts/PostList';
import PostEdit from '../ui/pages/posts/PostEdit';
import PostNew from '../ui/pages/posts/PostNew';
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor';

export const RoutesMap = new Map([
  [PostNew,'/admin/posts/create'],
  [PostEdit,'/admin/posts/:id'],
  [PostList,'/admin/posts'],
  [UserProfile,'/admin/users/:id'],
  [UserList,'/admin/users'],
  [MyProfile,'/my-profile'],
  [ResetPassword,'/reset-password/:token'],
  [ForgotPassword,'/forgot-password'],
  [VerifyEmail,'/verify-email/:token'],
  [Register,'/signup'],
  [Login,'/login'],
  [PermissionDenied,'/permission-denied'],
  ["AFTER_LOGIN",'/my-profile'],
]);

const ComponentRoute = (component) => <Route exact path={RoutesMap.get(component)} component={component}/>;

export const AppRoute = () => (
  <Router history={History}>
    <Switch>
      //auth
      <Redirect exact path="/" to={RoutesMap.get(Login)}></Redirect>
      {ComponentRoute(ResetPassword)}
      {ComponentRoute(ForgotPassword)}
      {ComponentRoute(VerifyEmail)}
      {ComponentRoute(Register)}
      {ComponentRoute(Login)}
      {ComponentRoute(PermissionDenied)}

      //admin
      //user
      {ComponentRoute(UserProfile)}
      {ComponentRoute(UserList)}
      {ComponentRoute(MyProfile)}

      //posts
      {ComponentRoute(PostList)}
      {ComponentRoute(PostEdit)}
      {ComponentRoute(PostNew)}

      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
);