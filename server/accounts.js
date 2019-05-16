import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor';
import Posts from '../imports/api/Posts';

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
    'users.setPermission'({ id,role }) {
        if (Roles.userIsInRole(Meteor.userId(), 'admins','.')){
            Roles.setUserRoles(id, role, Roles.GLOBAL_GROUP)
        }else{
            throw new Meteor.Error("Permission denied", "Unsufficient permission to do this action.");
        }
    }
}); 
Meteor.users.after.insert(function (userId, doc) {
    const userCount = Meteor.users.find({}).count();
    const defaultRole = userCount == 1 ? "admins" : "guest";

    if (doc){
        Roles.addUsersToRoles(doc._id, defaultRole, Roles.GLOBAL_GROUP)
    }else{
        throw new Meteor.Error("invalid user", "The user is not found.");
    }
  });

Meteor.users.after.update(function (userId, doc, fieldNames, modifier, options) {
    if (doc.profile.name !== this.previous.profile.name) {
        Posts.update({"author.id": doc._id}, {$set: {"author.name": doc.profile.name}}, {multi: true});
      }
});

Meteor.users.allow({
    update: function(userId, user) {
      return Roles.userIsInRole(Meteor.userId(), 'admins','.'); 
    }
  });

Accounts.urls.resetPassword = (token) => {
    return Meteor.absoluteUrl(`reset-password/${token}`);
};

Accounts.urls.verifyEmail = (token) => {
    return Meteor.absoluteUrl(`verify-email/${token}`);
};
