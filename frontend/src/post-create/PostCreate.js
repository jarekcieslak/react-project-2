import React from "react";
import {connect} from "react-redux";
import {Button, CircularProgress, Paper, Typography, withStyles} from "material-ui";
import {withRouter} from "react-router";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        height: 140,
        width: 100,
    },
});


class PostCreate extends React.Component {

    render() {
        let {classes, status} = this.props;
        status = 'ok';
        return (
            <div>
                Post Create
                {status === 'loading' && <CircularProgress className={classes.progress}/>}
                {status === 'ok' &&
                <Paper className={classes.root} elevation={4}>
                    <p>Create!!!</p>
                </Paper>}

                {status === 'error' &&
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline" component="h3">
                        Can't load the data.
                    </Typography>
                    <Button>Try again</Button>
                </Paper>}
            </div>)

    }
}

function mapStateToProps(state) {
    const slice = state.postDetails;
    return {
        status: slice.status,
        details: slice.data
    };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(PostCreate)));

