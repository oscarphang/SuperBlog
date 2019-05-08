import React from 'react'
import Profile from './components/Profile';
import { Meteor } from 'meteor/meteor';
import AppContainer from '../../layouts/AppContainer';

export default function UserProfile({match}) {
  return (
    <Profile id={match.params.id}  />
    
  )
}
