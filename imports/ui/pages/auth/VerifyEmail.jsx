import React from 'react'
import History from '../../../startup/History'; 
import msg from '../../../utils/msg';
import Alert from 'react-s-alert';
import { Accounts } from 'meteor/accounts-base';
import Login from './Login';
import {RoutesMap} from '../../../startup/AppRoute';

export default function VerifyEmail({match}) {
    const token = match.params.token;
    Accounts.verifyEmail(token, function (error) {
        if (error){
          msg(Alert.error,error.reason||"Verification failed.")
        }else{
          msg(Alert.success,"Verification successed, please login.")
        }
    });
    History.push(RoutesMap.get(Login));
  return (
    <></>
  )
}
