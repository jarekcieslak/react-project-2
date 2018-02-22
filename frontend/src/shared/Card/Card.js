import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 'auto',
  },
  media: {
    height: 200,
  },
};

function SimpleCard(props) {
  const { classes, data } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/850/200/?random"
          title="Contemplative Reptile"
        />
        <CardContent>
          {/*<pre>{JSON.stringify(data)}</pre>*/}
          <Typography variant="headline" component="h2">
            {data.title}
          </Typography>
          <Typography component="p">{data.body}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Show More
          </Button>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
