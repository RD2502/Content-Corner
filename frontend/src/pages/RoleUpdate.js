import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const validationSchema = yup.object({
    role: yup
        .string('Role')
        .max(5, 'text content should havea maximum of 4 characters ')
});



const Editrole = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
           role:''
        },

        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            updateUser(values);
            //alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });


    const updateUser = async (values) => {
        try {
            const { data } = await axios.put(`/api/admin/role/${id}`, values);
            if (data.success === true) {
                toast.success('Role updated');
                navigate('/admin/dashboard')
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }

    return (
        <>
            <Box sx={{ bgcolor: "white", padding: "20px 200px" }}>
                <Typography variant='h5' sx={{ pb: 4 }}> Update Role  </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="role"
                        label="role"
                        name='role'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Role"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.role && Boolean(errors.role)}
                        helperText={touched.role && errors.role}
                    />


                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        elevation={0}
                        sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px", }}
                    // disabled={loading}
                    >
                        Update Role
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default Editrole