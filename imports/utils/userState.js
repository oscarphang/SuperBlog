import { Meteor } from 'meteor/meteor';
import {useState} from 'react';

const userState= () =>{
    //return [user,isLoading]
    console.log(Meteor.user());
    if (Meteor.user() == undefined){
        return [undefined,true]
    }
    if (Meteor.user() == null){
        return [null,false]
    }
    return [Meteor.user(),false]
}

const wait = ms => new Promise((r, j)=>setTimeout(r, ms));

export const tryReconnect = new Promise(async (resolve,reject) =>{
    let attemptTimes = 3;
    let _user = null;

    const safePath =['/login','/','/reset-password/','/verify-email/','/signup'];

    if (safePath.some(elem=>window.location.pathname.includes(elem))){
        resolve({});
        return;
    }
    while (attemptTimes--){
        await wait(2000);
        console.log("try reconnecting");

        const [user,isLoading] =userState();
        if (!isLoading){
            console.log("connected");
            _user = user;
            break;
        }
    }
    if (_user){
        resolve(_user);
    }else{
        resolve(null);
    }
    
});

const useMeteorUser = () =>{
    const [isLoading,setIsloading]=useState(true);
    const [user,setUser]=useState(undefined);

    if (isLoading){
      tryReconnect.then(resUser=>{
        setUser(resUser);
        setIsloading(false);
      });
      
      
    }
    return [isLoading,user];
}
export default useMeteorUser;