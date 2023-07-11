import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify'
import { modules } from '../components/moduleToolbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const validationSchema = yup.object({
    name: yup
        .string('Add a post title')
        .min(4, 'text content should havea minimum of 4 characters ')
        .required('Post name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});



const EditProfile = () => {

    const{userInfo}=useSelector(state=>state.signIn);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');

    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: {
            name,
            email,
        },

        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            updateUser(values);
            //alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });


    //show post by Id
    const singleProfileById = async () => {
        // console.log(id)
        try {
            const { data } = await axios.get('/api/me');
            setname(data.user.name);
            setemail(data.user.email);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    useEffect(() => {
        singleProfileById()
    }, [])

    const updateUser = async (values) => {
        try {
            const { data } = await axios.put('/api/updateProfile', values);
            if (data.success === true) {
                toast.success('Profile updated');
            userInfo&&userInfo.role=='admin'?navigate('/admin/dashboard'):navigate('/user/dashboard')
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }

    return (
        <>
            <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
                <Typography variant='h5' sx={{ pb: 4 }}> Update Profile  </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="name"
                        label="name"
                        name='name'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />


                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="email"
                        label="email"
                        name='email'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        elevation={0}
                        sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px", }}
                    // disabled={loading}
                    >
                        Update profile
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default EditProfile