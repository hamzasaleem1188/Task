import React, { useEffect, useState } from "react";
import PopUpForm from "./components/PopUpForm";
import Buttons from "./components/Buttons";
import axios from "axios";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [data, setData] = useState(null);
  const [isRefresh, setRefresh] = useState(false);
  // const [isShowForm, setShowForm] = useState(false);
  // const [visible,setVisible]=useState(false);
//   const fetchNames = async () => {
//     //fetch the notes 
//     const res = await axios.get("http://localhost:4000/details");
//     setData(res?.data?.data)
// }
const handleSubmit = () => {
  setRefresh(true);
}
const handleDelete = () => {
  setRefresh(true);
}
//use Effect
useEffect(() => {
    // fetchNames();
}, [isRefresh]);
  return (

    <div>
      {/* <SignUp/> */}
      <Login/>
      {/* <h2 className="text-center m-5">WEBHOOK URL </h2> */}
      {/* {data ? <Buttons data= {data} onDelete = {handleDelete}/> : ""} */}

      {/* <PopUpForm onSubmit = {handleSubmit}/> */}
    </div>


  );
}

export default App;
