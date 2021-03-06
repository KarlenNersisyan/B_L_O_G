import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';

import getUniqueId from '../Blog/getUniqueId';


const styles = {
  container: {
    margin: '20px',
    padding: '20px',
  },
  postName: {
    color:'#426fab',
    fontSize:'30px',
  },
};

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      title: '',
      id: '',
      content: '',
      userId: '',
    };

    this.handlePost = this.handlePost.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
  }

  static postId = getUniqueId('posts') + 1;

  handleTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handlePost() {
    const { addPost, currentUser } = this.props;
    const { title, content } = this.state;

    addPost({
      userId: currentUser.id,
      title,
      content,
      id: (CreatePost.postId += 1),
      date: ('' + new Date()).substr(4, 11),
    });
    this.setState({
      redirectToReferrer: true,
      id: '',
      title: '',
      content: '',
      userId: '',
    });
  }

  render() {
    const { classes } = this.props;
    const { title, content, redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/blog-byNersisyan" />;
    }

    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={9}>
          <Paper className={classes.container}>
            <Typography align="center" className={classes.postName} >
            Share interesting news with us here!
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={9}>
                <TextField
                  fullWidth
                  required
                  label="Title"
                  value={title}
                  margin="normal"
                  placeholder="..."
                  onChange={this.handleTitle}
                />
              </Grid>
            </Grid>
            <TextField
              label="Content"
              margin="normal"
              value={content}
              required
              fullWidth
              multiline
              minRows={10}
              maxRows={10}
              placeholder="Write your post..."
              onChange={this.handleContent}
            />
            <Grid container direction="row-reverse">
              <Button
                
                color="secondary"
                aria-label="add"
                className={classes.button}
                onClick={this.handlePost}
              >
                <DoneIcon />
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CreatePost);
