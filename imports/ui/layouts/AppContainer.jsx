import React,{StrictMode} from 'react';
import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import { Meteor } from 'meteor/meteor';
import History from '../../startup/History';
import Login from '../pages/auth/Login';
import {RoutesMap} from '../../startup/AppRoute';
import {Route } from 'react-router';

export default AppContainer = ({children}) => {
  if (!Meteor.user()){
    History.replace(RoutesMap.get(Login));
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
      {"Users":`/admin/users`}
    ]};
  return (
    <StrictMode>
      <div className="font-sans antialiased h-screen">
        <TopBar companyName={"SUPER DATA SCIENCE"} />
        
        
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
