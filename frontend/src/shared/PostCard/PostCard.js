import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {Link} from "react-router-dom";
import Comment from 'material-ui-icons/Comment';
import LikeCounter from "../LikeCounter/LikeCounter";

const styles = theme => ({
  card: {
    maxWidth: 'auto',
  },
  media: {
    height: 200,
  },
  title: {

  },
  body: {
    marginBottom: 20
  },
  category: {
    marginBottom: 0,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },

});

function PostCard(props) {
  const {classes, data, index} = props;

  return (
    <div>
      <Card className={classes.card}>
        <Link to={`/posts/${data.id}`}>
          <CardMedia
            className={classes.media}
            image={"https://picsum.photos/850/200/?image=" + index + Math.floor(Math.random() * 100)}
            title="Contemplative Reptile"
          />
        </Link>
        <CardContent>
          <Typography className={classes.title} variant="headline" component="h2">{data.title}</Typography>
          <Typography className={classes.body} component="p">{data.body}</Typography>
          <Typography className={classes.category}>Category: {data.category}, Author: {data.author}, {Date(data.timestamp)} </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/posts/${data.id}`}><Button size="medium" color="primary">Show More</Button></Link>
          <LikeCounter voteScore={data.voteScore}></LikeCounter>
          {/*<Button size="small" color="default"><ThumbUp/>&nbsp;{data.voteScore}</Button>*/}
          <Button size="small" color="default"><Comment/>&nbsp;{data.commentCount}</Button>
        </CardActions>
      </Card>
    </div>
  );
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCard);
