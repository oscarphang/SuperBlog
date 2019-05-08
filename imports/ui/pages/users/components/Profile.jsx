import React,{useState} from 'react'
import AppContainer from '../../../layouts/AppContainer';
import { Meteor } from 'meteor/meteor';
import TextBox from '../../../components/basic/TextBox';
import Dropdown from '../../../components/basic/Dropdown';
import SimpleButton from '../../../components/basic/SimpleButton';
import SubmitButton from '../../../components/basic/SubmitButton';
import msg from '../../../../utils/msg';
import Alert from 'react-s-alert';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles'

function Profile({id, isPersonal=false,user}) {
const [copyTextShow,setCopyTextShow] = useState(false);
const userRoleValue = user&&user.roles&&user.roles["__global_roles__"]&&user.roles["__global_roles__"][0]||"";
const [role,setRole] = useState(userRoleValue);


const extraLabel = isPersonal?"Your ":"";
const handleSubmit = (event) => {
  event.preventDefault();

  const fdata = new FormData(event.target);
  Meteor.call('users.setPermission', {
      id: id,
      role: fdata.get("role")
  }, (error) => {
      // silent msg
      if (error) {
          msg(Alert.error, error.reason||"Assign user role failed");
      } else {
          
          // msg(Alert.success, `Successfully assigned user role.`);
      }
  });
  Meteor.users.update(id, {
    $set: {
      profile: {
        DOB:fdata.get("DOB"),
        address:fdata.get("address"),
        name:fdata.get("name"),
        contact:fdata.get("contact"),
      }
    }
  },
  function(err){
    if (!err){
      msg(Alert.success, `Profile updated.`);
    }else{
      console.log(err);
      msg(Alert.error, err.reason||`Profile update failed.`);
    }
  }
  );

};
return (
  <AppContainer>
<form onSubmit={handleSubmit} >

<div className=" flex justify-center">
  {user?
  <div className="w-2/3">
  <div className="mb-4 text-left">
    <TextBox label={`${extraLabel}Name`} value={user.profile.name} name="name" />
  </div>
  <div className="mb-4 text-left">
    <TextBox label="Date of Birth" name="DOB" value={user.profile.DOB||moment().add(-30, 'years').format("YYYY-MM-DD")} type="date"/>
  </div>
  <div className="mb-4 text-left">
    <TextBox label="Contact Number" name="contact" value={user.profile.contact} />
  </div>
  <div className="mb-4 text-left">
    <TextBox label="Address" name="address" value={user.profile.address} type="multiline" extraClass="h-32"/>
  </div>
  {
    Roles.userIsInRole(Meteor.userId(), 'admins','.')  && (Meteor.users.find({"roles.__global_roles__":"admins"}).count> 1 || id !=Meteor.userId()) &&
    <div className="mb-4 text-left">
      <Dropdown name={"role"} options={{"admins":"admins","guest":"guest"}} selected={role} onChange={event=>setRole(event.target.value)}/>
    </div>
  }
  <div className="mb-4 text-left flex justify-end">
    <div>
    <SubmitButton label="Update" />
    </div>
  </div>
</div>
:
<span>Invalid User</span>
}
  

</div>
</form>
  </AppContainer>
  
)
}

export default withTracker(({id, isPersonal=false}) => {
  return {
    id,
    isPersonal,
    user: Meteor.users.findOne({_id:id}),
  };
})(Profile);