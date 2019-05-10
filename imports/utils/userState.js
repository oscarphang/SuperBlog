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
    while (attemptTimes--){
        await wait(1000);
        console.log("try reconnecting");
        const [user,isLoading] =userState();
        if (!isLoading){
            console.log("connected");
            _user = user;
            break;
        }
    }
    resolve(_user);
});
export default userState;