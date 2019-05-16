import React from 'react'

export default function Dropdown({name,options,selected,onChange}) {
    const _onChange = event => onChange(event);
  return (
    <select onChange={_onChange} name={name} value={selected} className="block appearance-none w-full bg-gray-200 border border-gray-200 shadow-md text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
        {
            Object.entries(options).map(([key,value],i)=>
                <option key={i} value={key}>{value}</option>
            )
        }
    </select>
  )
}
