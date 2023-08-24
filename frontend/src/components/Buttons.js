import classes from './Style.module.css'
import axios from 'axios';
import { useState } from 'react';
import crossBtn from '../asserts/crossBtn.svg'
export default function Buttons({ data, onDelete }) {
    const [newData, setNewData] = useState([]);
    const handleDeleteBtn = async (_id) => {
        const res = await axios.delete(`http://localhost:4000/details/${_id}`);
        const Data = [...newData].filter((name) => {
            return name._id !== _id;
        })
        setNewData(Data);
        onDelete();
        // console.log(res.data);

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
                                        <button onClick={() => { handleDeleteBtn(dta._id) }}
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

        // <div className={classes.Container}>
        //     <div>
        //         {data.length ?
        //             <div>
        //                 {data && data.map((dta) => {
        //                     return (
        //                         <button onClick={() => { handleDeleteBtn(dta._id) }} className='btn btn-dark mx-3 my-3' key={dta?._id}>{dta?.btnName} </button>
        //                     )

        //                 })}
        //             </div> : ""
        //         }
        //     </div>
        // </div>
    )
}