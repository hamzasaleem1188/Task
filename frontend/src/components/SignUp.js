import React, { useEffect, useState } from 'react'
import classes from './Style.module.css';
import axios from 'axios';
import Login from './Login';
import Dashboard from './Dashboard';
const SignUp = () => {
    //Use States
    const [msg, setMsg] = useState('');
    const [loginSwitch, setLoginSwitch] = useState(false);
    const [isRedirected, setRedirection] = useState(false);
    const [createForm, setCreateForm] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const BASE_URL = "http://localhost:4000/api";
    const verifyToken = async ()=> {
        const token = localStorage.getItem("token")
        if(token) {
            const user = await axios.post(`${BASE_URL}/user/verify-token`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                  }
            });
            if(user.status === 200) {
                setRedirection(true);
            }
        }
    }
    useEffect(()=> {
        verifyToken();
    }, []);
    const handleLoginPage = () => {
        setLoginSwitch(true);
    }
    const registerData = async (e) => {
        try {
            if (msg.trim().length === 0) {
                console.log("feilds are empty");
                document.alert("Feild should not empty")
            }
            else {
                const user = await axios.post(`${BASE_URL}/auth/SignUp`, createForm);
                localStorage.setItem("token", user?.data?.token)
                setCreateForm({
                    fullName: '',
                    email: '',
                    password: '',
                });
                if(user && user?.status === 200) {
                    setRedirection(true);
                }
                console.log("User Registered Successful", user);
            }

        }
        catch (error) {
            console.log(error);
        }
    }
    const updateFields = (e) => {
        setMsg(e.target.value);
        const { name, value } = e.target;
        setCreateForm({
            ...createForm,
            [name]: value,
        })
    }
    return (
        <div className={classes.display}>
            {!isRedirected ?
            <div>
            {loginSwitch ? (<Login />) :
                <div className='container  col-md-4 border rounded p-5'>
                    <h2 className='m-1 my-4'>Create New Account</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        registerData();
                    }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Enter Full Name</label>
                            <input type="text" className="form-control" id="name" value={createForm.fullName}
                                placeholder='Enter Your Name' onChange={updateFields} name='fullName' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" value={createForm.email}
                                id="email" placeholder='Enter Email' onChange={updateFields} name='email' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control"
                                id="password" placeholder='Enter Password' name='password'
                                onChange={updateFields} value={createForm.password} />
                        </div>
                        <button type="submit" className="btn btn-primary">SignUp</button>
                        <p className='my-2'>Don't have account?
                            <span>
                                <a onClick={handleLoginPage} style={{ cursor: "pointer", margin: "10px 4px", border: "2px solid", borderRadius: "6px", padding: "6px", textDecoration: "none" }} >Login</a>
                            </span>
                        </p>

                    </form>
                </div>
            } 
            </div> : 
            <div>
                <Dashboard/> 
                </div> }
        </div>
    )
}

export default SignUp
