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
import History from '../../../startup/History';
import Login from './Login';
import {RoutesMap} from '../../../startup/AppRoute';

export default function ResetPassword({match}) {
    const token = match.params.token;

    const [data,setData]= useState({password:"",confirmPassword:"",validPassword:false,validConfirmPassword:false});
    const handleSubmit = (event) => {
        event.preventDefault();

        const fdata = new FormData(event.target);

        Accounts.resetPassword(token,fdata.get("password"), function(err){
            if (!err){
                msg(Alert.success, "Password resetted, please use your new password to login.");
                History.push(RoutesMap.get(Login));
            }else{
                msg(Alert.error, "Failed to reset password.");
            }
        })
      };
    const checkCurrentPassword = () =>{
        const [isValid, err] = validation.password(data.password);
        msg(Alert.error, err);
        setData({
            ...data,
            validPassword: isValid
        });
    };
    const checkCurrentConfirmPasswordOnChange = val =>{
        setData({...data,
            confirmPassword:val,
            validConfirmPassword:data.password==val})
    };
    const readyToReset = data.validPassword && data.validConfirmPassword;
    
    return (
        <AuthContainer header={"Reset Password"} >
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <TextBox label={"Password"} type={"password"} name="password" placeholder={"Your password"} value={data.password} valid={data.validPassword} onChange={val=>setData({...data,password:val})} 
                    onBlur={checkCurrentPassword}/>
                </div>
                <div className="mb-4">
                    <TextBox label={"Confirm password"} type={"password"} name="confirmPassword" placeholder={"Type your password again"} value={data.confirmPassword} valid={data.validConfirmPassword} 
                    onChange={checkCurrentConfirmPasswordOnChange} />
                </div>
                <div className="flex items-center justify-between">
                    <SubmitButton label={'Reset'} enable={readyToReset}/>
                </div>
            </form>
        </AuthContainer>
    )
}
