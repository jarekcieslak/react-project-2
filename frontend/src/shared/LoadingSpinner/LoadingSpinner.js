import React from 'react';
import {CircularProgress, withStyles} from "material-ui";

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center'
    }
});

const LoadingSpinner = (props) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <CircularProgress className={classes.progress}/>
        </div>
    );
};

export default withStyles(styles)(LoadingSpinner);
