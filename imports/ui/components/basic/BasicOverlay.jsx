import React from 'react'

export default function BasicOverlay({isShow,children}) {
    const common = "loading-overlay fixed pin z-50 overflow-auto bg-grey-darker fade-in";
    return isShow?
        <div className={`${common} flex content-center justify-center opacity-25`}>
         {children}
        </div>
     :
     <div className={`${common} hidden`} />
}
