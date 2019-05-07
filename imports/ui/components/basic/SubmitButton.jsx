import React from 'react'
import SimpleButton from './SimpleButton';

export default function SubmitButton({label,enable=true}) {
  return (
    <SimpleButton extraClass={""} bgColor={"teal"} whiteText={true} enable={enable} label={label} preventDefault={false}/>
  )
}
