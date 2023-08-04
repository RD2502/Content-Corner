import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Box, Container, Grid, TextField } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/Loader';
import { base } from '../utils/config';




const Home = () => {
    

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    //display posts

    const showPosts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${base}/api/post/showPost`);
            setPosts(data.posts);
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.error);
        }
    }

    useEffect(() => {
        showPosts();
    }, []);

    

    return (
        <>
        
            <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
                <Navbar />
                
            <TextField
             sx={{
                pt:2,
                pl:50,
                width:500,
                mb: 3,
                "& .MuiInputBase-root": {
                    color: 'text.secondary',
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" }
            }}
            fullWidth
            name='Search'
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            />

                <Container sx={{ pt: 3, pb: 5, minHeight: "83vh" }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                            {
                                loading ? <Loader /> :

                                    posts&&posts.filter((post) => {
                                        return search.toLowerCase() === ''
                                          ? post
                                          : post.title.toLowerCase().includes(search.toLowerCase());
                                      }).map((post, index) => (
                                        <Grid item xs={2} sm={4} md={4} key={index} >
                                            <PostCard
                                                name={post.postedBy.name}
                                                id={post._id}
                                                title={post.title}
                                                content={post.content}
                                                image={post.image ? post.image.url : ''}
                                                subheader={moment(post.createdAt).format('MMMM DD, YYYY')}
                                                comments={post.comments.length}
                                                likes={post.likes.length}
                                                likesId={post.likes}
                                                showPosts={showPosts}
                                            />
                                        </Grid>
                                    ))
                            }

                        </Grid>
                    </Box>

                </Container>
                <Footer />
            </Box>
        </>
    )
}

export default Home
