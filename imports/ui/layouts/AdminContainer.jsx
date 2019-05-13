import React,{useEffect,useState} from 'react'
import AppContainer from './AppContainer';
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor';
import msg from '../../utils/msg';
import Alert from 'react-s-alert';
import PermissionDenied from '../pages/auth/PermissionDenied';
import LoadingSpinner from '../components/basic/LoadingSpinner';
import useMeteorUser from '../../utils/userState';
import { Redirect } from 'react-router';
import Login from '../pages/auth/Login';
import {RoutesMap} from '../../startup/AppRoute';
import History from '../../startup/History';

export default function AdminContainer({children}) {
    const [isLoading,user]=useMeteorUser();

    if (isLoading){
      return <LoadingSpinner isLoading />
    }else{
      if (!user){
        msg(Alert.error,"Unauthorised user");
        History.push(RoutesMap.get(Login));
      }
    }

  return (
    
    <AppContainer>
        {Roles.userIsInRole(Meteor.userId(), 'admins','.')?<>{children}</>:<PermissionDenied/> }
    </AppContainer>
  )
}
