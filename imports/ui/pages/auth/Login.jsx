import React,{useState} from 'react'
import AuthContainer from './layouts/AuthContainer';
import {Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import SubmitButton from '../../components/basic/SubmitButton';
import TextBox from '../../components/basic/TextBox';
import { Meteor } from 'meteor/meteor'
import msg from '../../../utils/msg';
import History from '../../../startup/History';
import LoadingSpinner from '../../components/basic/LoadingSpinner';
import {RoutesMap} from '../../../startup/AppRoute';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

export default function Login() {
    const [login,setLogin] = useState({email:"",password:""});
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const fdata = new FormData(event.target);
        setIsLoading(true);
        Meteor.loginWithPassword(fdata.get("email"), fdata.get("password"), function(err){
            setIsLoading(false);
            if(!err){
                msg(Alert.success,"login successfully");
                History.push(RoutesMap.get("AFTER_LOGIN"));
            }else{
                msg(Alert.error,"Wrong email or password");
            }
        })
        
      };

    const footerBUtton = (<p className="text-gray-600 text-sm">Don't have an account? 
    <Link className="no-underline text-blue-500 hover:underline font-bold" to={RoutesMap.get(Register)}>Create an Account</Link>.</p>);
    const readyLogin = login.email!==""&&login.password!=="";
  return (
    <AuthContainer header={"Login"} elemFooter={footerBUtton}>
        <LoadingSpinner isLoading={isLoading}/>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <TextBox label={'Email'} placeholder={'Your Email'} name={'email'} value={login.email} onChange={val=>setLogin({...login,email:val})}/>
            </div>

            <div className="mb-4">
                <TextBox label={'Password'} placeholder={'Your Password'} name={'password'} type={'password'} value={login.password} onChange={val=>setLogin({...login,password:val})}/>
            </div>

            <div className="flex items-center justify-between">
                <SubmitButton label={'Login'} enable={readyLogin} />
                <Link className="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-600 float-right" to={RoutesMap.get(ForgotPassword)}>Forgot Password?</Link>
            </div>
        </form>
    </AuthContainer>
  )
}
