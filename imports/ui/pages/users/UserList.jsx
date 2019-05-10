import React from 'react'
import AdminContainer from '../../layouts/AdminContainer';
import TableGen from '../../components/basic/TableGen';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Link } from 'react-router-dom';
import {RoutesMap} from '../../../startup/AppRoute';
import SimpleButton from '../../components/basic/SimpleButton';
import UserProfile from '../users/UserProfile';

function UserList({users}) {
  const tableData = users.map(elem=>({"id":elem._id,"Username":elem.username,"Name":elem.profile.name}));
  
  const actionButton = id =>(<><Link to={`${RoutesMap.get(UserProfile).replace(":id","")}${id}`} className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">Edit</Link></>);
  return (
    <AdminContainer>
      <TableGen data={tableData} colSeq={["Username","Name"]} action={actionButton}/>
    </AdminContainer>
  )
}

export default withTracker(() => {
  return {
    users: Meteor.users.find({}).fetch(),
  };
})(UserList);