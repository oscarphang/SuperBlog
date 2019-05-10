import React from 'react'
import Profile from './components/Profile';
import { Meteor } from 'meteor/meteor';
import AppContainer from '../../layouts/AppContainer';

export default function MyProfile() {
  return (
    <AppContainer>
      <Profile id={Meteor.userId()} isPersonal={true} />
    </AppContainer>
    
    
  )
}
