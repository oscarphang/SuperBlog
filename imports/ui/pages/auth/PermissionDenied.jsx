import React,{useState,useEffect} from 'react'
import History from '../../../startup/History';
import {RoutesMap} from '../../../startup/AppRoute';
import Login from '../auth/Login';

export default function PermissionDenied() {
  const [timer,setTimer] = useState(3);

  useEffect(()=>{
    let intvl = setInterval(function(){ 
      if (timer == 1){
        History.push(RoutesMap.get(Login));
      }else{
        setTimer(timer-1); 
      }
    }, 1000);
    return ()=>{ clearInterval(intvl)}
  });
  return (
    <div className="fade-in bg-gray-200 h-screen flex content-center justify-center">
      <div className="self-center">
          <span className="text-5xl text-teal-600 block">Permission Denied 🙅‍♂️️</span>
          <span className="block">{`Redirecting in ${timer} seconds`}</span>
      </div>
         
        </div>
  )
}
