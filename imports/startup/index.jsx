import React from 'react'
import Alert from 'react-s-alert';
import {AppRoute} from './AppRoute';
import sub from '../api/sub';

export default function App() {

  return (
    <>
    <AppRoute/>
    <Alert stack={{limit: 3}} />
    </>
  )
}
