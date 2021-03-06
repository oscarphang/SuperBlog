import React,{useEffect,useState} from 'react';
import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import { Meteor } from 'meteor/meteor';
import History from '../../startup/History';
import Login from '../pages/auth/Login';
import {RoutesMap} from '../../startup/AppRoute';
import UserList from '../pages/users/UserList';
import PostList from '../pages/posts/PostList';
import BlogHome from '../pages/blog/BlogHome';
import { Roles } from 'meteor/alanning:roles'
import { Redirect } from 'react-router';
import PermissionDenied from '../pages/auth/PermissionDenied';
import useMeteorUser from '../../utils/userState';
import LoadingSpinner from '../components/basic/LoadingSpinner';
import Alert from 'react-s-alert';
import msg from '../../utils/msg'

export default AppContainer = ({children}) => {
  const [isLoading,user]=useMeteorUser();

  if (isLoading){
    return <LoadingSpinner isLoading />
  }
  const adminMenu = Roles.userIsInRole(Meteor.userId(), 'admins','.')?{"Maintenace":
  [
    {"Posts":PostList},
    {"Users":UserList}
  ]}:{};
  const menu = {
    "Main":
    [
      {"Latest Posts":BlogHome},
    ],
    ...adminMenu
    };
  return  Roles.userIsInRole(Meteor.userId(), ['guest','admins'],'.')?
    <div className="font-sans antialiased h-screen ">
        <TopBar companyName={"COMPANY"} />
        
        
        <div id="main" className="pt-16 ">
      
          <SideBar menuList={menu} />
          <div className="bg-gray-200 h-full pt-8">
            <div className="text-center w-full text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </div>
    : <PermissionDenied/>;
    
};
