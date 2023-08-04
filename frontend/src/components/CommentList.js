import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const CommentList = ({ name, text }) => {
    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="https://icons8.com/icon/85147/male-user" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={name}
                        secondary={
                            <>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {text}
                                </Typography>
                            </>
                        }
                    />
                </ListItem>

            </List>

        </>
    );
}

export default CommentList;
