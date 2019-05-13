import React,{useState,useEffect} from 'react'
import History from '../../../startup/History';
import {RoutesMap} from '../../../startup/AppRoute';
import Login from '../auth/Login';

export default function PermissionDenied() {
  const [timer,setTimer] = useState(3);

  useEffect(()=>{
    let intvl = setInterval(function(){ 
      if (timer == 0){
        History.push(RoutesMap.get(Login));
      }else{
        setTimer(timer-1); 
      }
    }, 1000);
    return ()=>{ clearInterval(intvl)}
  });
  return (
    <div className="fade-in bg-grey-lighter h-screen flex content-center justify-center">
         <span className="self-center text-5xl text-teal-dark">Permission Denied 🙅‍♂️️</span>
          <span>{`Redirecting in ${timer} seconds`}</span>
        </div>
  )
}
