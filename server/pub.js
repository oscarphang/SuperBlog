import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles'

Meteor.publish("userData", function() {
    const currentUser = this.userId;
    const isAdmin = Roles.userIsInRole(this.userId, 'admins', '.');
    if (currentUser){
        return isAdmin ?
        Meteor.users.find({})
        :
        Meteor.users.find({
            _id: currentUser
        });
    }else{
        return Meteor.users.find({}, {
        fields: {
            "username":1,
        }
        });
    }

});