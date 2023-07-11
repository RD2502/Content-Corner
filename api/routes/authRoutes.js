const express = require('express');
const { signup, signin, logout, userProfile, updateProfile, forgotPassword, resetPassword, updateRole, deleteUser, showUser } = require('../controllers/authController.js');
const { isAuthenticated, isAdmin } = require('../middleware/auth.js');
const router = express.Router();

router.post('/signup',signup);

router.post('/signin',signin);

router.get('/logout',logout);
router.get('/showUsers',isAuthenticated,isAdmin,showUser)
router.get('/me',isAuthenticated,userProfile);

router.put('/updateProfile',isAuthenticated,updateProfile);
router.put("/admin/role/:id",isAuthenticated,isAdmin,updateRole)
router.delete("/admin/userdelete/:id",isAuthenticated,isAdmin,deleteUser)


module.exports=router;