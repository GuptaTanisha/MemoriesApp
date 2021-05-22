import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost,updatePost } from '../../actions/posts';
const Form = ({currentId,setCurrentId}) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId? state.posts.find((p) => p._id === currentId) : null);
    const dispatch= useDispatch();
    const classes= useStyles();
    
    useEffect(() => {
        if(post) setPostData(post);
    },[post])
    const handleSubmit = (e) => {
           e.preventDefault();
           if(currentId) {
               dispatch(updatePost(currentId, postData));
               clear();
            }
           else {dispatch(createPost(postData));
               clear();
        }
    }

    const clear = () => {
         setCurrentId(null);
         setPostData({creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }

    return (
        <Paper className={classes.paper}>
              <form autoComplete="on" noValidate className={` ${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing':'Creating'} a memory</Typography>
                <TextField name="creator" variant="outlined" value={postData.creator} onChange={(e) => setPostData({...postData,creator: e.target.value})} label="Creator" fullWidth />
                <TextField name="title" variant="outlined" value={postData.title} onChange={(e) => setPostData({...postData,title: e.target.value})} label="Title" fullWidth />
                <TextField name="message" variant="outlined" value={postData.message} onChange={(e) => setPostData({...postData,message: e.target.value})} label="Message" fullWidth />
                <TextField name="tags" variant="outlined" value={postData.tags} onChange={(e) => setPostData({...postData,tags: e.target.value.split(',')})} label="Tags" fullWidth />
                <div className={classes.fileInput}>
                   <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData,selectedFile: base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

              </form>
        </Paper>
    )
}

export default Form;
