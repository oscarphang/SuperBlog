import React from 'react'

export default function LoadingSpinner({isLoading=false}) {
    const common = "loading-overlay fixed pin z-50 overflow-auto bg-grey-darker";
  return isLoading?
      <div className={`${common} flex content-center justify-center opacity-25`}>
       <div className="lds-ellipsis self-center"><div></div><div></div><div></div><div></div></div>
      </div>
   :
   <div className={`${common} hidden`} />
}
