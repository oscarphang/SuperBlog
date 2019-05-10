import React,{useEffect,useState} from 'react'
import { Meteor } from 'meteor/meteor';
import History from '../../../../startup/History';
import {RoutesMap} from '../../../../startup/AppRoute';
import ForgotPassword from '../ForgotPassword';
import Login from '../Login';
import Register from '../Register';
import ResetPassword from '../ResetPassword';
import VerifyEmail from '../VerifyEmail';
import { Redirect } from 'react-router';
export default function AuthContainer({header,elemFooter=<></>,children}) {
  const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);
  useEffect(()=>{
    
    if (Meteor.userId()!==null){
      setIsUserLoggedIn(true)
    }
  },[]);

  return (
    !isUserLoggedIn?
    <div className="bg-grey-lighter h-screen font-sans">
    <div className="container mx-auto h-full flex justify-center items-center">
      <div className="w-1/3">
          <h1 className="font-hairline mb-6 text-center">{header}</h1>
          <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
              {children}
          </div>
          <div className="text-center">
                {elemFooter}
          </div>
      </div>
  </div>
  </div>: <Redirect to={RoutesMap.get("AFTER_LOGIN")} />
  )
}
