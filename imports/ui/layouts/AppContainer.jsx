import React,{StrictMode,useEffect,useState} from 'react';
import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import { Meteor } from 'meteor/meteor';
import History from '../../startup/History';
import Login from '../pages/auth/Login';
import {RoutesMap} from '../../startup/AppRoute';
import UserList from '../pages/users/UserList';
import PostList from '../pages/posts/PostList';
import { Roles } from 'meteor/alanning:roles'
import { Redirect } from 'react-router';
import userState,{tryReconnect} from '../../utils/userState';
import LoadingSpinner from '../components/basic/LoadingSpinner';

export default AppContainer = ({children}) => {
  const [isLoading,setIsloading]=useState(true);
  const [user,setUser]=useState(null);

  if (isLoading){
    tryReconnect.then(resUser=>{
      setUser(resUser);
      setIsloading(false);
    })
    return <LoadingSpinner isLoading />
  }

  const adminMenu = Roles.userIsInRole(user._id, 'admins','.')?{"Maintenace":
  [
    {"Posts":PostList},
    {"Users":UserList}
  ]}:{};
  const menu = {
    "Main":
    [
      {"Latest Posts":`/blog`},
    ],
    ...adminMenu
    };
  return (
    <StrictMode>
      <div className="font-sans antialiased h-screen">
        <TopBar companyName={"SUPER DATA SCIENCE"} />
        
        
        <div id="main" className="pt-16">
      
          <SideBar menuList={menu} />
          <div className="bg-grey-lighter h-full pt-8">
            <div className="text-center w-full text-grey-darkest">
            {children}
          </div>
        </div>
      </div>
    </div>
    </StrictMode>
    )
};
