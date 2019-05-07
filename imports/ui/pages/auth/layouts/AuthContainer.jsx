import React,{useEffect,useState} from 'react'
import { Meteor } from 'meteor/meteor';
import History from '../../../../startup/History';
import {AFTER_LOGIN} from '../constants/path';

export default function AuthContainer({header,elemFooter=<></>,children}) {
  const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);

  useEffect(()=>{
    setIsUserLoggedIn(Meteor.userId() && window.location.pathname.indexOf("/auth")!==-1);
  },[]);

  if(isUserLoggedIn){
    History.replace(AFTER_LOGIN);
    return <></>;
  };
  return (
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
  </div>
  )
}
