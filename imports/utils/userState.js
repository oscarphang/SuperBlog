import { Meteor } from 'meteor/meteor';

const userState= () =>{
    //return [user,isLoading]
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
        resolve(undefined);
    }
    
});
export default userState;