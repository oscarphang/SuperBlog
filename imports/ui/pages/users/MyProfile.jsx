import React from 'react'
import Profile from './components/Profile';
import { Meteor } from 'meteor/meteor';
import AppContainer from '../../layouts/AppContainer';

export default function MyProfile() {
  return (
    <Profile id={Meteor.userId()} isPersonal={true} />
    
  )
}
