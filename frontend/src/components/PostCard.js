import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { base } from '../utils/config';
//import image from '../images/blog.jpg'




const PostCard = ({
    id,
    title,
    subheader,
    image,
    content,
    comments,
    showPosts,
}) => {


    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        
                    </Avatar>
                }

                title={title}
                subheader={subheader}

            />
            <Link to={`/post/${id}`}>

                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt="img"
                />
            </Link>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {/* {content} */}

                    <Box component='span' dangerouslySetInnerHTML={{ __html: content.split(" ").slice(0, 10).join(" ") + "..." }}></Box>

                </Typography>
            </CardContent>
            <CardActions >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    
                    <Box>
                        {comments}
                        <IconButton aria-label="comment">
                            <CommentIcon />
                        </IconButton>
                    </Box>
                </Box>

            </CardActions>

        </Card>
    );
}

export default PostCard;