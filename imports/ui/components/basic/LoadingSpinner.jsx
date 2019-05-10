import React from 'react'
import BasicOverlay from './BasicOverlay';

export default function LoadingSpinner({isLoading=false}) {
  return <BasicOverlay isShow={isLoading}>
  <div className="lds-ellipsis self-center"><div></div><div></div><div></div><div></div></div>
  </BasicOverlay>
}
