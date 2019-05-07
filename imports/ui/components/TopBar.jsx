import React from 'react';
import AuthMenu from './AuthMenu';

export default function TopBar({companyName}){
    const logo = "";
    return (
        <header className="fixed z-50 h-16 w-full bg-grey-darker shadow flex items-center justify-between">
    <div className="flex items-center h-full">
        <div className="flex items-center text-center h-full w-48 border-r border-grey-dark pl-6">
        <img className="h-5" src={logo} alt=""/>
            <span className="text-white text-sm uppercase font-extrabold"> {companyName}</span>
        </div>
        <div className="flex items-center w-64">
          {/* breadcrumb */}
        </div>
    </div>
    <div className="flex items-center h-full text-sm">
        <div className="flex items-center h-full">
            <AuthMenu />
        </div>
    </div>
  </header>
    );
}