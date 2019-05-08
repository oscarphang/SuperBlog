import React, {
    useState
} from 'react'
import AuthContainer from './layouts/AuthContainer';
import {
    Accounts
} from 'meteor/accounts-base';
import Alert from 'react-s-alert';
import msg from '../../../utils/msg';
import TextBox from '../../components/basic/TextBox';
import SubmitButton from '../../components/basic/SubmitButton';
import validation from '../../../utils/validation';
import History from '../../../startup/History';
import {LOGIN} from './constants/path';

export default function Register({match}) {
    const [data, setData] = useState({
        email: "",
        password: "",
        username: "",
        validEmail: false,
        validPassword: false
    });
    const handleSubmit = (event) => {
        event.preventDefault();

        const fdata = new FormData(event.target);
        const emailUsername = fdata.get("email").toLowerCase();
        Accounts.createUser({
                username: emailUsername,
                email: emailUsername,
                password: fdata.get("password"),
                profile: {
                    name: fdata.get("name"),
                    referralID:match.params.token
                }
            },
            async function (err) {
                console.log(err);
                if (err) {
                    msg(Alert.error, err);
                } else {
                    msg(Alert.success, `Registered successfully`);
                    Meteor.call('users.sendVerify', {
                        username: emailUsername
                    }, (error, res) => {
                        if (error) {
                            console.log(error);
                            msg(Alert.error, error.message);
                        } else {
                            msg(Alert.success, `Verification email sent to your inbox.`);
                            History.push(LOGIN);
                        }
                    });
                }
            });
    };


    const checkCurrentEmail = () => {
        const [isValid, err] = validation.email(data.email);
        msg(Alert.error, err);
        setData({
            ...data,
            validEmail: isValid
        });
    }

    const checkCurrentPw = () => {
        const [isValid, err] = validation.password(data.password);

        msg(Alert.error, err);
    };
    const checkPwOnChange = val => {
        const [isValid, err] = validation.password(val);
        setData({...data,
            password:val,
            validPassword: isValid})
    };

    const readyToSubmit = data.validEmail && data.validPassword && data.username !== "";
    return (       
    <AuthContainer header={"Register"} >
        <form onSubmit={handleSubmit} >
        <div className="mb-4">
                <TextBox label={"Name"} name="name" placeholder={"Your Name"} value={data.username} onChange={value=>setData({...data,username:value})}/>
            </div>
            <div className="mb-4">
                <TextBox label={"Email"} name="email" placeholder={"Your Email"} value={data.email} valid={data.validEmail} onChange={val=>setData({...data,email:val})} onBlur={checkCurrentEmail}/>
            </div>

            <div className="mb-4">
                <TextBox label={"Password"} name="password" placeholder={"Your Password"} valid={data.validPassword}  type={'password'} value={data.password} 
                onChange={checkPwOnChange} onBlur={checkCurrentPw}/>
            </div>
            <div className="flex items-center justify-between">
                <SubmitButton label={'Register'} enable={readyToSubmit}/>
            </div>
        </form>
    </AuthContainer>
    )
}