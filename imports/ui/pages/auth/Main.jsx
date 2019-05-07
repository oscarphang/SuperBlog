import React from 'react'
import { Route} from 'react-router';
import Login from './Login';
import Register from './Register';
import VerifyEmail from './VerifyEmail';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

export function Main({match}) {
  return (
    <>
      <Route exact path={`${match.path}/reset-password/:token`} component={ResetPassword}/>
      <Route exact path={`${match.path}/forgot-password`} component={ForgotPassword}/>
      <Route exact path={`${match.path}/verify-email/:token`} component={VerifyEmail}/>
      <Route exact path={`${match.path}/register/:token`} component={Register}/>
      <Route exact path={`${match.path}/register`} component={Register}/>
      <Route exact path={`${match.path}/login`} component={Login}/>
    </>
  )
}
