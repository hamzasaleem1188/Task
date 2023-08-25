import React, { useState ,useEffect } from 'react';
import { Link, Router } from 'react-router-dom';
import classes from './Style.module.css';
import SignUp from './SignUp';
import axios from 'axios';
import Dashboard from './Dashboard';

const Login = () => {
    const [isSwitch, setSwitch] = useState(false);
    const [msg, setMsg] = useState('');
    const [createForm, setCreateForm] = useState({
        email: '',
        password: '',
    });
    const [isRedirected, setRedirection] = useState(false);


    const BASE_URL = "http://localhost:4000/api";
    const verifyToken = async () => {
        const token = localStorage.getItem("token")
        if(token) {
            const user = await axios.post(`${BASE_URL}/user/verify-token`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (user && user?.status === 200) {
                setRedirection(true);
            } else setRedirection(false)
        }
    }
    useEffect(() => {
        verifyToken();
    }, []);

    const loginData = async (e) => {
        try {
            if (msg.trim().length === 0) {
                console.log("feilds are empty");
                document.alert("Feild should not empty")
            }
            else {

                const user = await axios.post('http://localhost:4000/api/auth/Login', createForm);
                localStorage.setItem("token", user?.data?.token)
                setCreateForm({
                    email: '',
                    password: '',
                });
                console.log("User Login Successful", user);
                if (user && user?.status === 200) {
                    setRedirection(true);
                }
                console.log("User Login Successful", user);
            }

        }
        catch (error) {
            console.log(error);
        }
    }
    const updateFeilds = (e) => {
        setMsg(e.target.value);
        const { name, value } = e.target;
        setCreateForm({
            ...createForm,
            [name]: value,
        })
    }


    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/auth/Login", createForm);
            setCreateForm({
                email: '',
                password: '',
            });
            console.log(response.data.token);
            localStorage.setItem("jwtToken", response.data.token);
        } catch (error) {
            return error;
        }
    };

    const handleSignUpClick = () => {
        setSwitch(true);
    }
    return (
        <div>
            {!isRedirected ? <div>
                {isSwitch ? (<SignUp />) :
                    (
                        <div className={classes.display}>
                            <div className="container  col-md-4 border rounded p-5">
                                <h2 className="m-1 my-4">Login</h2>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    loginData();
                                }}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email"
                                            placeholder="Enter Email" onChange={updateFeilds} name='email' value={createForm.email} />
                                        <div id="emailHelp" className="form-text">
                                            We'll never share your email with anyone else.
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter Password"
                                            onChange={updateFeilds} name='password' value={createForm.password}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                                    <p className="my-2">Not have account?
                                        <span>
                                            <a
                                                onClick={handleSignUpClick}
                                                style={{
                                                    cursor: "pointer",
                                                    margin: "10px 4px",
                                                    border: "2px solid",
                                                    borderRadius: "6px",
                                                    padding: "6px",
                                                }}
                                            >
                                                SignUp
                                            </a>
                                        </span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div> :
                <Dashboard />
            }

        </div>
    )
}

export default Login
