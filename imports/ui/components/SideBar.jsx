import React, { useContext } from 'react';
import globalState from '../states/GlobalState';
import SideBarItem from './SideBarItem';
import {RoutesMap} from '../../startup/AppRoute';

export default function SideBar({menuList}){

    return (
        <div className="bg-gray-800 relative h-full min-h-screen">
        {
          Object.entries(menuList).map(([key, value]) =>(
            <div className="xl:py-2" key={key}>
              <div className="hidden xl:block uppercase font-bold text-gray-700 text-xs px-4 py-2">
                {key}
              </div>
              {
                value.map((elem,i)=>{
                  const subElem = Object.entries(elem);
                  const [k,v]=subElem[0];
                  const rawUrl = RoutesMap.get(v);
                  const url = rawUrl?rawUrl.split(":")[0]:undefined;
                return <SideBarItem label={k} key={i} imgUrl={""} url={url}/>})
              }
            </div>
          ))
        }
    </div>
    
    );
}