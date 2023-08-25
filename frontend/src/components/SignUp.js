import React, { useEffect, useState } from "react";
import classes from "./Style.module.css";
import axios from "axios";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  //Use States
  const [msg, setMsg] = useState("");
  const [loginSwitch, setLoginSwitch] = useState(false);
  const [isRedirected, setRedirection] = useState(false);
  const [createForm, setCreateForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const BASE_URL = "http://localhost:4000/api";

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await axios.post(
        `${BASE_URL}/user/verify-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (user.status === 200) {
        setRedirection(true);
      }
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const handleLoginPage = () => {
    setLoginSwitch(true);
  };

  const registerData = async (e) => {
    try {
      if (msg.trim().length === 0) {
        toast("fields cannot be empty!");
      } else {
        const user = await axios.post(`${BASE_URL}/auth/SignUp`, createForm);
        localStorage.setItem("token", user?.data?.token);
        setCreateForm({
          fullName: "",
          email: "",
          password: "",
        });

        if (user && user?.status === 200) {
          setRedirection(true);
        }
        console.log("User Registered Successful", user);
      }
    } catch (error) {
      //   toast(error);
      if (error.request.status === 409) {
        console.log("Email Already Exist");
        toast("Email Already Exist");
      }
    }
  };
  const updateFields = (e) => {
    setMsg(e.target.value);
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };
  return (
    <div className={classes.display}>
      {!isRedirected ? (
        <div>
          {loginSwitch ? (
            <Login />
          ) : (
            <div className="container  col-md-4 border rounded p-5">
              <ToastContainer />
              <h2 className="m-1 my-4">Create New Account</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  registerData();
                }}
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Enter Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={createForm.fullName}
                    placeholder="Enter Your Name"
                    onChange={updateFields}
                    name="fullName"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={createForm.email}
                    id="email"
                    placeholder="Enter Email"
                    onChange={updateFields}
                    name="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={updateFields}
                    value={createForm.password}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  //   onClick={fieldsEmpty}
                >
                  SignUp
                </button>
                <p className="my-3">
                  Already have account?
                  <span
                    onClick={handleLoginPage}
                    style={{
                      cursor: "pointer",
                      margin: "10px 4px",
                      border: "1px solid",
                      borderRadius: "4px",
                      padding: "4px 6px ",
                      backgroundColor: "lightgray",
                    }}
                  >
                    {" "}
                    Login
                  </span>
                </p>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Dashboard />
        </div>
      )}
    </div>
  );
};

export default SignUp;
