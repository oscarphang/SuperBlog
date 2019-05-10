import React, {useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import {currentUser} from '../states/GlobalState';
import History from '../../startup/History';
import Alert from 'react-s-alert';
import msg from '../../utils/msg';
import {Link } from 'react-router-dom';
import {RoutesMap} from '../../startup/AppRoute';
import Login from '../pages/auth/Login';

export default function AuthMenu() {
    const currentUser = Meteor.user();
    const {name} = currentUser?currentUser.profile:{name:""};

    const logOut = () =>{
        Meteor.logout(err=>{
            if (!err){
                msg(Alert.success,"logout successfully");
                History.push(RoutesMap.get(Login));
            }else{
                msg(Alert.error,"failed to logout");
            }
        })
    }
  return (
    <div className="group relative h-full">
        {
            <>
            <a href="#" className="text-white flex items-center h-full bg-grey-darkest px-4">
                {name}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-6 w-6 text-grey-darker fill-current ml-1"><path className="heroicon-ui" d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>
            </a>
            <div className="hidden group-hover:block absolute pin-r top-full w-48 bg-black">
                <Link className="block text-left py-3 px-3 text-white hover:text-blue-dark text-xs" to="/my-profile">My Account</Link>
                <a href="#" onClick={logOut} className="block text-left py-3 px-3 text-white hover:text-blue-dark text-xs">
                    Logout
                </a>
            </div>
            </>
        }
        
    </div>
  )
}
