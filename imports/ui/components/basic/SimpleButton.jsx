import React from 'react'

export default function SimpleButton({label,extraClass="",whiteText=false,bgColor="teal",onClick=null,preventDefault=true,enable=true,invertHoverColor=false}) {
    const _onClick = (event)=>{
        if (preventDefault){
            event.preventDefault();
        }
        if (onClick){
            onClick();
        }
    }
    const [color1,color2]=!invertHoverColor?[`bg-${bgColor}-dark`,`hover:bg-${bgColor}`]:[`bg-${bgColor}`,`hover:bg-${bgColor}-dark`];
  return (
    <button className={`${extraClass} ${whiteText?"text-white":""} ${enable?`${color1} ${color2}`:"bg-grey-dark cursor-not-allowed"} font-bold py-2 px-4 rounded`} 
    type="submit" value="Submit" disabled={!enable} onClick={_onClick} disabled={!enable} >
        {label}
    </button>
  )
}
