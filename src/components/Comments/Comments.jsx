import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import SingleComment from '../SingleComment/SingleComment';

export default class Comments extends Component {
  render() {
    const {
      comments,
      users,
      handleEditComment,
      handleDeleteComment,
      currentUser,
    } = this.props;

    return (
      <Grid container justifyContent="center">
        {comments.map(({ userId, title, content, date, id, postId }) => (
          <Grid key={id} item xs={12} sm={9}>
            <SingleComment
              userId={userId}
              title={title}
              content={content}
              date={date}
              id={id}
              users={users}
              postId={postId}
              currentUser={currentUser}
              handleEditComment={handleEditComment.bind(this, {
                title,
                content,
                id,
                date,
                userId,
                postId,
              })}
              handleDeleteComment={handleDeleteComment.bind(this, {
                title,
                content,
                id,
                date,
                userId,
                postId,
              })}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}
