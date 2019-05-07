import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'users.sendVerify'({ username }) {
        const user = Accounts.findUserByUsername(username);
        if (user){
            Accounts.sendVerificationEmail(user._id, username)
        }
    }
  });
  
Accounts.urls.resetPassword = (token) => {
    return Meteor.absoluteUrl(`reset-password/${token}`);
};

Accounts.urls.verifyEmail = (token) => {
    return Meteor.absoluteUrl(`verify-email/${token}`);
};
