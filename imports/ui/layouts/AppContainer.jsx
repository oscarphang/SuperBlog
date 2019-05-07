import React,{StrictMode} from 'react';
import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import { Meteor } from 'meteor/meteor';
import History from '../../startup/History';
import Profile from '../pages/users/Profile';
import UserList from '../pages/users/UserList';
import MyProfile from '../pages/users/MyProfile';
import {LOGIN} from '../../ui/pages/auth/constants/path';
import {Route } from 'react-router';

export default AppContainer = ({children}) => {
  if (!Meteor.user()){
    History.replace(LOGIN);
    return <></>;
  }
  const menu = {
    "Main":
    [
      {"Dashboard":`/dashboard`},
      {"Leave":`/leave`},
      {"Claim": `/claim`}
    ],
    "Maintenace":
    [
      {"Users":`/users`}
    ]};
  return (
    <StrictMode>
      <div className="font-sans antialiased h-screen">
        <TopBar companyName={"COMPANY"} />
        
        
        <div id="main" className="pt-16">
      
          <SideBar menuList={menu} />
          <div className="bg-white h-full pt-8">
            <div className="text-center w-full text-grey-darkest">
            {children}
          </div>
        </div>
      </div>
    </div>
    </StrictMode>
    
    )
};
