import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';

import getUniqueId from '../Blog/getUniqueId';

const styles = {
  'comment-box': {
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '5px',
  },
};

class CreateComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      content: '',
      userId: '',
      postId: '',
    };

    this.handleComment = this.handleComment.bind(this);
    this.handleContent = this.handleContent.bind(this);
  }

  static commentId = getUniqueId('comments');

  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleComment() {
    const { addComment, currentUser, post } = this.props;
    const { content } = this.state;

    addComment({
      userId: currentUser.id,
      postId: post.id,
      content,
      id: (CreateComment.commentId += 1),
      date: ('' + new Date()).substr(4, 11),
    });

    this.setState({ id: '', content: '', userId: '', postId: '' });
  }

  render() {
    const { classes } = this.props;
    const { content } = this.state;

    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={9}>
          <TextField
            label="Comment"
            value={content}
            required
            fullWidth
            multiline
            minRows={4}
            maxRows={5}
            placeholder="Write your comment..."
            onChange={this.handleContent}
            margin="normal"
          />
          <Grid container direction="row-reverse">
            <Button
              
              color="primary"
              aria-label="add"
              className={classes.button}
              onClick={this.handleComment}
              disabled={content.trim() === '' ? true : false}
            >
              <DoneIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CreateComment);
