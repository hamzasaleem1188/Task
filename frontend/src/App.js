import React, { useEffect, useState } from "react";
import PopUpForm from "./components/PopUpForm";
import Buttons from "./components/Buttons";
import axios from "axios";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

function App() {
  const [data, setData] = useState(null);
  const [isRefresh, setRefresh] = useState(false);
  // const [isShowForm, setShowForm] = useState(false);
  // const [visible,setVisible]=useState(false);
  return (

    <div>
      <Login/>
    </div>


  );
}

export default App;
