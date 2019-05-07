import React, { useContext } from 'react';
import globalState from '../states/GlobalState';
import SideBarItem from './SideBarItem';

export default function SideBar({menuList}){

    return (
        <div className="bg-grey-darkest relative h-full min-h-screen">
        {
          Object.entries(menuList).map(([key, value]) =>(
            <div className="xl:py-2" key={key}>
              <div className="hidden xl:block uppercase font-bold text-grey-darker text-xs px-4 py-2">
                {key}
              </div>
              {
                value.map((elem,i)=>{
                  const subElem = Object.entries(elem);
                  const [k,v]=subElem[0];

                return <SideBarItem label={k} key={i} imgUrl={""} url={v}/>})
              }
            </div>
          ))
        }
    </div>
    
    );
}