import * as React from 'react';
// import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Edit.css'


const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log('id', id)
    const [jsonData, setJsonData] = useState([])
    const [data, setData] = useState({
        id: '',
        name: '',
        email: '',
        designation: '',
        experience: '',
        doj: ''

    });

    const getEmployeeDataFromServer = useCallback(async () => {
        const rawResult = await fetch('http://localhost:1010/employees');
        const employeeDb = await rawResult.json();
        setJsonData(employeeDb)
    }, [])

    React.useEffect(() => {
        getEmployeeDataFromServer();
    }, [getEmployeeDataFromServer])


    useEffect(() => {
        if (id) {
            var newArray = jsonData.filter(function (el) {
                return el.id === id;

            });
            setData(newArray[0])
            // console.log('data', data)
        }
    }, [id, jsonData])

    const handleChange = (event) => {
        console.log(event, "event")
        const filterFormDataCopy = { ...data };
        filterFormDataCopy[event.target.name] = event.target.value;
        console.log(filterFormDataCopy, "filterFormData")
        setData(filterFormDataCopy)
    };



    const handleUpdate = async (event) => {
        event.preventDefault();
        const request = {
            method: 'PUT',
            data: data,
            url: `http://localhost:1010/employee/${id}`
        };
        await axios(request).then((res) => {
            navigate("/home");
        });
    };
    // console.log(data)

    return (
        <div className='edit'>

            <TextField id="outlined-basic"
                name='id' label="id" variant="outlined" value={data?.id} onChange={handleChange} />
            <TextField id="outlined-basic"
                name='name' label="name" variant="outlined" value={data?.name} onChange={handleChange} />
            <TextField id="outlined-basic"
                name='email' label="Email" variant="outlined" value={data?.email} onChange={handleChange} />
            <TextField id="outlined-basic"
                name='designation' label="Designation" variant="outlined" value={data?.designation} onChange={handleChange} />
            <TextField id="outlined-basic"
                name='experience' label="Experience"
                variant="outlined" value={data?.experience} onChange={handleChange} />
            <TextField id="outlined-basic"
                name='doj' label="doj"
                variant="outlined" value={data?.doj} onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
        </div>
    );
}

export default Edit;
