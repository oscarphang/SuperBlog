import React, {
    useState
} from 'react'
import AuthContainer from './layouts/AuthContainer';
import {
    Accounts
} from 'meteor/accounts-base';
import validation from '../../../utils/validation';
import SubmitButton from '../../components/basic/SubmitButton';
import TextBox from '../../components/basic/TextBox';
import Alert from 'react-s-alert';

export default function ForgotPassword() {
    const [data,setData]= useState({email:"",confirmEmail:"",validEmail:false,validConfirmEmail:false});
    const handleSubmit = (event) => {
        event.preventDefault();

        const fdata = new FormData(event.target);

        Accounts.forgotPassword({email:fdata.get("email")}, function(err){
            if (!err){
                msg(Alert.success, "Password reset email sent, please check your email.");
            }else{
                msg(Alert.error, "Failed to send reset password email.");
            }
        })
      };
    const checkCurrentEmail = () =>{
        const [isValid, err] = validation.email(data.email,true);
        console.log(isValid, err);
        msg(Alert.error, err);
        setData({
            ...data,
            validEmail: isValid
        });
    };
    const checkCurrentConfirmEmailOnChange = val =>{
        setData({...data,
            confirmEmail:val,
            validConfirmEmail:data.email==val})
    };
    const readyToReset = data.validEmail && data.validConfirmEmail;
  return (
    <AuthContainer header={"Forgot Password"} >
        <form onSubmit={handleSubmit} >
            <div className="mb-4">
                <TextBox label={"Email"} name="email" placeholder={"Your email"} value={data.email} valid={data.validEmail} onChange={val=>setData({...data,email:val})} 
                onBlur={checkCurrentEmail}/>
            </div>
            <div className="mb-4">
                <TextBox label={"Confirm email"} name="confirmEmail" placeholder={"Type your email again"} value={data.confirmEmail} valid={data.validConfirmEmail} 
                onChange={checkCurrentConfirmEmailOnChange} />
            </div>
            <div className="flex items-center justify-between">
                <SubmitButton label={'Reset'} enable={readyToReset}/>
            </div>
        </form>
    </AuthContainer>
  )
}
