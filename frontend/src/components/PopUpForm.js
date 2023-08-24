import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
export default function PopUpForm({ onSubmit }) {
    const [isShow, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [createForm, setCreateForm] = useState({
        webURL: '',
        content: '',
        btnName: '',
    });
    // create new form
    const createData = async (e) => {
        // e.preventDefault();
        //create data with post request
        const res = await axios.post("http://localhost:4000/details", createForm);
        //update state
        //clear form state
        setCreateForm({
            webURL: "",
            content: "",
            btnName: '',
        })
        setShow(true);
        onSubmit();

    }

    const updateCreateFormField = (e) => {
        const { name, value } = e.target;
        setCreateForm({
            ...createForm,
            [name]: value,
        })
    }

    return (
        <div className='container '>

            <div className='text-center my-5'>
                <button type="button" className="btn btn-primary" onClick={() => { setVisible(true) }}>Create webhook Button</button>
            </div>
            <Modal isOpen={visible} >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    createData();
                    setVisible(false);
                }} >
                    <div className='container text-center'>
                        <h2>Create New WEBHOOK URL</h2>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label"><b>webhook URL</b></label>
                        <input onChange={updateCreateFormField} value={createForm.webURL} type="url" className="form-control" name='webURL' id="recipient-name" placeholder="Enter webhook url" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label"><b>Content</b></label>
                        <textarea onChange={updateCreateFormField} value={createForm.content} placeholder="Enter Content here..." name='content' className="form-control" id="message-text"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label"><b>Button Name</b></label>
                        <input onChange={updateCreateFormField} value={createForm.btnName} type="text" className="form-control" name='btnName' id="btnName" placeholder="Enter button name" />
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => { setVisible(false) }} type="button" className="btn btn-secondary" >Close</button>
                        <button type="submit" className="btn btn-primary mx-3 my-3" >Save</button>
                    </div>
                </form>
            </Modal>
            {/* <div className='text-center my-5'>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" data-bs-whatever="@mdo">Create webhook Button</button>
            </div> */}
            {/* {
                !isShow &&
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create New webhook</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={createData}>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">webhook URL</label>
                                        <input onChange={updateCreateFormField} value={createForm.webURL} type="url" className="form-control" name='webURL' id="recipient-name" placeholder="Enter webhook url" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Content</label>
                                        <textarea onChange={updateCreateFormField} value={createForm.content} placeholder="Enter Content here..." name='content' className="form-control" id="message-text"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Button Name</label>
                                        <input onChange={updateCreateFormField} value={createForm.btnName} type="text" className="form-control" name='btnName' id="btnName" placeholder="Enter button name" />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" >Save</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            } */}
        </div>
    )
}
