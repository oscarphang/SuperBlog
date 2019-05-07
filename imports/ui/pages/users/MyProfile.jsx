import React from 'react'
import Profile from './Profile';
import { Meteor } from 'meteor/meteor';
import AppContainer from '../../layouts/AppContainer';

export default function MyProfile() {
    const params= {params:{id:Meteor.userId()}}
  return (
    <Profile match={params} isPersonal={true} />
    
  )
}
