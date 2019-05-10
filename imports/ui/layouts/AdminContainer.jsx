import React,{useEffect,useState} from 'react'
import AppContainer from './AppContainer';
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor';
import msg from '../../utils/msg';
import Alert from 'react-s-alert';
import PermissionDenied from '../pages/auth/PermissionDenied';
import LoadingSpinner from '../components/basic/LoadingSpinner';
import {tryReconnect} from '../../utils/userState';
import { Redirect } from 'react-router';
import Login from '../pages/auth/Login';
import {RoutesMap} from '../../startup/AppRoute';
import History from '../../startup/History';

export default function AdminContainer({children}) {
    const [isLoading,setIsloading]=useState(true);
    const [user,setUser]=useState(null);

    if (isLoading){
      tryReconnect.then(resUser=>{
        setUser(resUser);
        setIsloading(false);
      },({message})=>{
        msg(Alert.error,message);
        History.push(RoutesMap.get(Login));
      });
      
      return <LoadingSpinner isLoading />
    }

  return (
    
    <AppContainer>
        {Roles.userIsInRole(user._id, 'admins','.')?<>{children}</>:<PermissionDenied/> }
    </AppContainer>
  )
}
