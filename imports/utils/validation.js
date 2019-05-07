const rules={
    "email":/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    "password":/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
};

export default validation ={
    
    "email": (email,isExistingEmail=false) =>{
        const emailFormatChecker = new RegExp(rules.email);
        let err="";
        if (!emailFormatChecker.test(email)){
            err="not a valid email";
            return [false,err];
        }
        const user = Accounts.users.find({username:email}).fetch();
        if (!isExistingEmail&&user.length>0){
            err="this email has been registered.";
            return [false,err];
        }
        if (isExistingEmail&&user.length==0){
            err="this email is not registered.";
            return [false,err];
        }
        return [true,err];
      },
    "password":pw =>{
        const pwChecker = new RegExp(rules.password);
        let err="";
        if (!pwChecker.test(pw)){
            err="Password must be at least 8 characters, no more than 15 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.";
            return [false,err];
        }
        return [true,err];
    }
}