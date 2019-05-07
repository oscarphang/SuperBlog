import React from 'react'

export default function SimpleButton({label,extraClass,whiteText=false,bgColor="teal",onClick=null,preventDefault=true,enable=true}) {
    const _onClick = (event)=>{
        if (preventDefault){
            event.preventDefault();
        }
        if (onClick){
            onClick();
        }
    }
  return (
    <button className={`${extraClass} ${whiteText?"text-white":""} ${enable?`bg-${bgColor}-dark hover:bg-${bgColor}`:"bg-grey-dark cursor-not-allowed"} font-bold py-2 px-4 rounded`} 
    type="submit" value="Submit" disabled={!enable} onClick={_onClick} disabled={!enable}>
        {label}
    </button>
  )
}
