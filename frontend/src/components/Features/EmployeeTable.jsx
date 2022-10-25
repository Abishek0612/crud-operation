import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useCallback, useEffect } from 'react';
import { Button,  } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from "material-ui-search-bar";
import './EmployeeTable.css'


const EmployeeTable = () => {
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState([]);
  const [searched, setSearched] = useState('')
  const headers = [
    "Name",
    "Email",
    "Experience",
    "Designation",
    "Doj",
    "Edit",
    'Delete'
  ]


  const getEmployeeDataFromServer = useCallback(async () => {
    const rawResult = await fetch("http://localhost:1010/employees");
    const employeeDb = await rawResult.json();
    setJsonData(employeeDb);

  }, []);

  useEffect(() => {
    getEmployeeDataFromServer();
  }, [getEmployeeDataFromServer])

  const handleDelete = async (id) => {
    const request = {
      method: 'DELETE',
      url: `http://localhost:1010/employee/${id}`,
    };
    await axios(request).then((res) => {
      console.log(res, 'res-');
    });
    getEmployeeDataFromServer();
  }

  const handleEdit = async (id) => {
    navigate(`/edit/${id}`);
  };


  const requestSearch = (searchedVal) => {
    const filteredRows = jsonData?.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase())
    });
    setJsonData(filteredRows)
  };

  const cancelSearch = () => {
    setSearched('');
    getEmployeeDataFromServer();
    requestSearch(searched)
  };


  console.log(jsonData, 'jsonData');
  return (

    <>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <br></br>
      <Link to='/addNew' >
        {" "}
        <Button variant="contained" component="label" className='add' >
          Add New Employee
        </Button>
      </Link>
      <br></br>

      <TableContainer component={Paper} className='table' >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>{
              headers.map((header) => {
                return <TableCell align="left" >{header}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData.map((row) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.experience}</TableCell>
                <TableCell align="left">{row.designation}</TableCell>
                <TableCell align="left">{row.doj}</TableCell>
                <TableCell align="left" className='buttons' onClick={() => handleEdit(row.id)}>
                  <ModeEditIcon />

                </TableCell>
                <TableCell align="left" onClick={() => handleDelete(row.id)}  >
                  <DeleteIcon />
                </TableCell>
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  );
}

export default EmployeeTable;