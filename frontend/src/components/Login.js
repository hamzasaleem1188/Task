import React, { useState } from 'react';
import { Link, Router } from 'react-router-dom';
import classes from './Style.module.css';
import SignUp from './SignUp';
const Login = () => {
    const [isSwitch, setSwitch] = useState(false);
    const handleSignUpClick = () => {
        setSwitch(true);
    }
    return (
        <div>{isSwitch ? (<SignUp/>) :
            (<div className={classes.display}>
                <div className='container  col-md-4 border rounded p-5'>
                    <h2 className='m-1 my-4'>Login</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder='Enter Email' />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder='Enter Password' />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <p className='my-2'>Not have account?
                        <span>
                            <a onClick={handleSignUpClick} style={{cursor: "pointer", margin: "10px 4px", border: "2px solid", borderRadius: "6px", padding: "6px",textDecoration:"none"}}>SignUp</a>
                            </span>
                        </p>

                    </form>
                </div>
            </div>)}
        </div>
    )
}

export default Login
