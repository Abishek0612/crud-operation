import * as React from 'react';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import './Features/Add.css'

const AddEmployee = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        id: '',
        name: '',
        email: '',
        experience: '',
        designation: '',
        doj: '',
    });

    const handleChange = (event) => {
        const filterFormDataCopy = { ...data };
        filterFormDataCopy[event.target.name] = event.target.value;
        setData(filterFormDataCopy);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(data, 'data')
        const request = {
            method: "POST",
            data: data,
            url: "http://localhost:1010/employee",
        };
        await axios(request).then((res) => {
            console.log(res, "res-");
            navigate("/home")
        });
    };




    return (
        <div className='add'>

            <TextField id="outlined-basic"
                name='id'
                label="id"
                variant="outlined"
                onChange={handleChange} />


            <TextField id="outlined-basic"
                name='name'
                label="name"
                variant="outlined"
                onChange={handleChange} />


            <TextField id="outlined-basic"
                name='email'
                label="email"
                variant="outlined"
                onChange={handleChange} />

            <TextField id="outlined-basic"
                name='experience'
                label="experience"
                variant="outlined"
                onChange={handleChange} />

            <TextField id="outlined-basic"
                name='designation'
                label="designation"
                variant="outlined"
                onChange={handleChange} />

            <TextField id="outlined-basic"
                name='doj'
                label="doj"
                variant="outlined"
                onChange={handleChange} />

            <Button variant="contained" onClick={handleSubmit}>Submit</Button>

        </div>


    )
}

export default AddEmployee;