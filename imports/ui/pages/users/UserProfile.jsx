import React from 'react'
import Profile from './components/Profile';
import { Meteor } from 'meteor/meteor';
import AdminContainer from '../../layouts/AdminContainer';

export default function UserProfile({match}) {
  return (
    <AdminContainer>
      <Profile id={match.params.id}  />
    </AdminContainer>
    
    
  )
}
