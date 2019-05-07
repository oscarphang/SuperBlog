import React from 'react'
import AppContainer from '../../layouts/AppContainer';
import TableGen from '../../components/basic/TableGen';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Link } from 'react-router-dom';
import SimpleButton from '../../components/basic/SimpleButton';

function UserList({users}) {
  const tableDataUsers = users.map(elem=>({"id":elem._id,"Username":elem.username,"Name":elem.profile.name}));
  
  const actionButton = id =>(<><Link to={`/user-profile/${id}`} className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">View</Link></>);
  return (
    <AppContainer>
      <TableGen data={tableDataUsers} colSeq={["Username","Name"]} action={actionButton}/>
    </AppContainer>
  )
}

export default withTracker(() => {
  return {
    users: Meteor.users.find({}).fetch(),
  };
})(UserList);