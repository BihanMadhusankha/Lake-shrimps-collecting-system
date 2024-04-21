import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { message } from 'antd';

const useSignup =() => {
    const {login} = useAuth();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const registerUser = async (values) => {
        if(values.password!== values.cpassword) {
       return setError( 'Password are not the same');
    }

    try{
        setError(null);
        setLoading(false);
        const response = await fetch('http://localhost:5001/SSABS/user/signup/', {
            method: 'POST',
            body: JSON.stringify(values)
        });

        const data = await response.json();
        if(data.status === 200) {
            message.success(data.message);
            login(data.token, data.user);
        }
        else if(data.status ===4000	){
            setError(data.message)
        }
        else{
            message.error('Registration failed')
        }
    }
    catch(error) {
        message.error(error);
    }
    finally{
        setLoading(false);
    }
  
};
return{loading,error, registerUser}
}
export default useSignup