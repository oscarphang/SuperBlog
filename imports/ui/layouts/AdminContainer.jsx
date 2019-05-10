import React,{useEffect,useState} from 'react'
import AppContainer from './AppContainer';
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor';
import msg from '../../utils/msg';
import Alert from 'react-s-alert';
import PermissionDenied from '../pages/auth/PermissionDenied';
import LoadingSpinner from '../components/basic/LoadingSpinner';
import {tryReconnect} from '../../utils/userState';

export default function AdminContainer({children}) {
    const [isLoading,setIsloading]=useState(true);
    const [user,setUser]=useState(null);

    if (isLoading){
      tryReconnect.then(resUser=>{
        setUser(resUser);
        setIsloading(false);
      })
      return <LoadingSpinner isLoading />
    }
  return (
    
    <AppContainer>
        {Roles.userIsInRole(user._id, 'admins','.')?<>{children}</>:<PermissionDenied/> }
    </AppContainer>
  )
}
