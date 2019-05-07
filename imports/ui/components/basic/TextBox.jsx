import React,{useState} from 'react'

export default function TextBox({label,extraClass="",placeholder="",name,value="",type="text",valid=null,onChange=null,onBlur=null}) {
    const [val,setVal]=useState(value);
    const _onChange = event =>{
        setVal(event.target.value)
        if (onChange){
            onChange(event.target.value);
        }
    };
    const _onBlur = event =>{
        if (onBlur){
            onBlur();
        }
    }
    let bgColor = "white";
    if (value!==""&&valid!==null){
        if (valid){
            bgColor="green-lightest";
        }else{
            bgColor="red-lighter";
        }
    }

  return (
    <>
    <label className="font-bold text-grey-darker block mb-2">{label}</label>
    {
        type=="multiline"?
        <textarea className={`${extraClass} block appearance-none w-full bg-${bgColor} border border-grey-light hover:border-grey px-2 py-2 rounded shadow`}  
        name={name} placeholder={placeholder||`Please enter ${label}`} onChange={event=>_onChange(event)} onBlur={_onBlur} value={val}></textarea>
        :
        <input type={type} className={`${extraClass} block appearance-none w-full bg-${bgColor} border border-grey-light hover:border-grey px-2 py-2 rounded shadow`} 
        placeholder={placeholder||`Please enter ${label}`} name={name} value={val} onChange={event=>_onChange(event)} onBlur={_onBlur}/>
    }
    </>
  )
}
