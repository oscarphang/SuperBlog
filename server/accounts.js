import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'users.sendVerify'({ username }) {
        const user = Accounts.findUserByUsername(username);
        if (user){
            Accounts.sendVerificationEmail(user._id, username)
        }else{
            throw new Meteor.Error("invalid user", "The user is not found.");
        }
    }
  });
 
Meteor.methods({
    'users.setDefaultPermission'({ username }) {
        const userCount = Meteor.users.find({}).count();
        const defaultRole = userCount == 1 ? "admins" : "guest";
        const user = Accounts.findUserByUsername(username);
        
        if (user){
            Roles.addUsersToRoles(user._id, defaultRole, Roles.GLOBAL_GROUP)
        }else{
            throw new Meteor.Error("invalid user", "The user is not found.");
        }
    }
}); 
Meteor.methods({
    'users.setPermission'({ id,role }) {
        console.log( id,role,Roles.userIsInRole(Meteor.userId(), 'admins','.'));
        if (Roles.userIsInRole(Meteor.userId(), 'admins','.')){
            Roles.setUserRoles(id, role, Roles.GLOBAL_GROUP)
        }else{
            throw new Meteor.Error("Permission denied", "Unsufficient permission to do this action.");
        }
    }
}); 

Meteor.users.allow({
    update: function(userId, user) {
      return Roles.userIsInRole(Meteor.userId(), 'admins','.'); 
    }
  });

Accounts.urls.resetPassword = (token) => {
    return Meteor.absoluteUrl(`auth/reset-password/${token}`);
};

Accounts.urls.verifyEmail = (token) => {
    return Meteor.absoluteUrl(`auth/verify-email/${token}`);
};
