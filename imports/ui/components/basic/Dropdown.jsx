import React from 'react'

export default function Dropdown({name,options,selected,onChange}) {
    const _onChange = event => onChange(event);
  return (
    <select onChange={_onChange} name={name} value={selected} className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey" id="grid-state">
        {
            Object.entries(options).map(([key,value],i)=>
                <option key={i} value={key}>{value}</option>
            )
        }
    </select>
  )
}
