const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth.js');
const { createPost, showPost, showSinglePost, updatePost, addComment, addLike, removeLike, deletePost, showPostById } = require('../controllers/postController.js');

const router = express.Router();

router.post('/post/create',isAuthenticated,createPost)

router.get('/post/showPost',showPost)
router.get('/post/showPostById',isAuthenticated,showPostById)
router.get('/post/:id', showSinglePost);
router.delete('/delete/post/:id', isAuthenticated, deletePost);
router.put('/update/post/:id', isAuthenticated, updatePost);
router.put('/comment/post/:id', isAuthenticated, addComment);


module.exports=router;
