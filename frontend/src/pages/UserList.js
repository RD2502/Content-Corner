import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment'
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';


const Userlist = () => {

    const [users, setUsers] = useState([]);

    const displayUser = async () => {
        try {
            const { data } = await axios.get('/api/showUsers');
            setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        displayUser();
    }, [])


    //delete post by Id
    const deleteUserById = async (e, id) => {
        // console.log(id)
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const { data } = await axios.delete(`/api/admin/userdelete/${id}`);
                if (data.success === true) {
                    toast.success(data.message);
                    displayUser();
                }
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    }



    const columns = [

        {
            field: 'name',
            headerName: 'Name',
            width: 150,
           
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
        },

        {
            field: "Actions",
            width: 100,
            renderCell: (value) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Link to={`/updaterole/${value.row._id}`}>
                        <IconButton aria-label="edit" >
                            <EditIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="delete" onClick={(e) => deleteUserById(e, value.row._id)} >
                        <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>

                </Box>
            )
        }
    ];


    return (
        <Box >

            <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
                Users
            </Typography>
            
            <Paper sx={{ bgcolor: "white" }} >

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: "white"
                            },

                        }}
                        rows={users}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default Userlist