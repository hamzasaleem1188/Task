import React, { useState } from 'react'
import classes from './Style.module.css';
import axios from 'axios';
const SignUp = () => {
    const [fullName,setFullName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [createForm, setCreateForm] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const registerData=async()=>{
        try{
            await axios.post('/api/auth/SignUp',{fullName,email,password});
            console.log("User Registered Successful");
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div className={classes.display}>
            <div className='container  col-md-4 border rounded p-5'>
                <h2 className='m-1 my-4'>Create New Account</h2>
                <form onSubmit={registerData}>
                <div class="mb-3">
                        <label htmlFor="name" class="form-label">Enter Full Name</label>
                        <input type="text" class="form-control" id="name" 
                        placeholder='Enter Your Name' onChange={(e)=>{
                            setFullName(e.target.value);
                        }}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="email" class="form-label">Email</label>
                        <input type="email" class="form-control" 
                        id="email" placeholder='Enter Email' onChange={(e)=>{
                            setEmail(e.target.value);
                        }}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="password" class="form-label">Password</label>
                        <input type="password" class="form-control" 
                        id="password" placeholder='Enter Password' onChange={(e)=>{
                            setPassword(e.target.value);
                        }}/>
                    </div>
                    <button type="submit" class="btn btn-primary">SignUp</button>
                    <p className='my-2'>Not have account?<span><a href="">Login</a></span></p>
                    {/* <Link to="/SignUp" role="button">SignUp</Link> */}

                </form>
            </div>
        </div>
    )
}

export default SignUp
