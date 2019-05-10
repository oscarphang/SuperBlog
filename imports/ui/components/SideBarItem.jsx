import React,{useContext,useState} from 'react'
import {Link } from 'react-router-dom';

export default function SideBarItem({label,imgUrl,url="#"}) {
    const isActive = window.location.pathname.indexOf(url)!==-1 ;
    const activeStyle = "border-blue-dark xl:bg-black bg-black xl:opacity-75";
    const inActiveStyle = "border-transparent hover:bg-black";

  return (
      <div className="group relative sidebar-item with-children">
          <Link to={url}  className={`block xl:flex xl:items-center text-center xl:text-left shadow-light xl:shadow-none py-6 xl:py-2 xl:px-4 border-l-4 ${isActive?activeStyle:inActiveStyle}`}>
          <img src={imgUrl} alt=""/>
          <div className="text-white text-xs">{label}</div>
          </Link>
      </div>
  )
}
