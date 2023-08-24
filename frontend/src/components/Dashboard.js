import React, { useState } from 'react'
import Buttons from './Buttons';
import PopUpForm from './PopUpForm';


const Dashboard = () => {
    const [data, setData] = useState(null);
  const [isRefresh, setRefresh] = useState(false);
    const handleSubmit = () => {
        setRefresh(true);
      }
      const handleDelete = () => {
        setRefresh(true);
      }
    return (
        <>
            {data ? <Buttons data= {data} onDelete = {handleDelete}/> : ""}

            <PopUpForm onSubmit = {handleSubmit}/>
        </>
    )
}

export default Dashboard
