import React,{useState} from 'react'
import AppContainer from '../../layouts/AppContainer';
import { Meteor } from 'meteor/meteor';
import TextBox from '../../components/basic/TextBox';
import SimpleButton from '../../components/basic/SimpleButton';
import SubmitButton from '../../components/basic/SubmitButton';
import msg from '../../../utils/msg';
import Alert from 'react-s-alert';

export default function Profile({match, isPersonal=false}) {
const [copyTextShow,setCopyTextShow] = useState(false);
const id = match.params.id;
const user = Meteor.users.findOne({_id:id});
const referrer = user ? Meteor.users.findOne({_id:user.profile.referralID}) : null;
const referrals = Meteor.users.find({"profile.referralID":id}).fetch();

const copyRLink = () => {
    const copyText = document.getElementById("referLink");
    copyText.select();
    document.execCommand("copy");
    setCopyTextShow(true);
    setTimeout(()=>setCopyTextShow(false),1000);
};
const extraLabel = isPersonal?"Your ":"";
const handleSubmit = (event) => {
  event.preventDefault();

  const fdata = new FormData(event.target);
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
      console.log(error);
      msg(Alert.error, error.message);
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

  <div className="mb-4 text-left flex justify-between">
    <div>
      <input id="referLink" type="text" className="border border-grey-light hover:border-grey px-2 py-2 rounded shadow" readOnly value={`${window.location.origin}/auth/register/${id}`}/>
    <SimpleButton extraClass={"w-32 ml-3 "} onClick={copyRLink} bgColor="blue" whiteText={true} label={copyTextShow?"Copied!":"Copy Link"}/>
    </div>
    <div>
    <SubmitButton label="Update" />
    </div>
  </div>
  {
    referrer &&
    <div className="mb-4 text-left">
      <label className="font-bold text-grey-darker block mb-2">Referred by:</label>
      <span>{referrer.profile.name}</span>
    </div>
  }
  {
    referrals.length>0 &&
    <div className="mb-4 text-left">
      <label className="font-bold text-grey-darker block mb-2">{`${extraLabel}Referral:`}</label>
      <ul>
        {
          referrals.map((elem,i)=><li key={i}>{elem.profile.name}</li>)
        }
      </ul>
    </div>
  }
</div>
:
<span>Invalid User</span>
}
  

</div>
</form>
  </AppContainer>
  
)
}

