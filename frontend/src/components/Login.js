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
                        <div class="mb-3">
                            <label htmlFor="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" placeholder='Enter Email' />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label htmlFor="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" placeholder='Enter Password' />
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                        <p className='my-2'>Not have account?
                        <span>
                            <a onClick={handleSignUpClick} style={{cursor: "pointer", margin: "10px 0px", border: "2px solid", borderRadius: "6px", padding: "6px"}}>SignUp</a>
                            </span>
                        </p>
                        {/* <Link to="/SignUp">SignUp</Link> */}

                    </form>
                </div>
            </div>)}
        </div>
    )
}

export default Login
