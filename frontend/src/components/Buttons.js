import classes from './Style.module.css'
import axios from 'axios';
import { useState } from 'react';
import crossBtn from '../asserts/crossBtn.svg'
export default function Buttons({ data, onDelete }) {
    const [newData, setNewData] = useState([]);
    const handleDeleteBtn = async (_id) => {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`http://localhost:4000/api/webhook/delete/${_id}`,{
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
        // const Data = [...newData].filter((name) => {
        //     return name._id !== _id;
        // })
        // setNewData(Data);
        console.log('before refresh:::');
        onDelete();
        // console.log(res.data);

    }
    const handleClickCount = async (id) => {
        const token = localStorage.getItem("token");
        const res = await axios.post(`http://localhost:4000/api/webhook/update-click`,{id}, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
          console.log('res::::',res);
    }
    return (
        <>
            <h2 className="text-center m-5">WEBHOOK URL </h2>
            <div className={classes.Container}>
                <div className={classes.btnContainer}>
                    {data.length ?
                        <div className={classes.btnDiv}>
                            {data && data.map((dta) => {
                                return (
                                    <div className={classes.directions} key={dta?._id}>
                                        <button onClick={() => { handleClickCount(dta._id) }}
                                            className='btn btn-dark my-3' key={dta?._id}>{dta?.btnName} </button>
                                        <div className={classes.crossBtn} onClick={() => { handleDeleteBtn(dta._id) }}>
                                            <img src={crossBtn} />
                                        </div>
                                    </div>
                                )

                            })}
                        </div> : ""
                    }

                </div>
            </div>
        </>
    )
}