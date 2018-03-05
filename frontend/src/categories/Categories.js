import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Api} from "../api/Api";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import {ButtonBase, Typography, withStyles} from "material-ui";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

class Categories extends Component {
    componentDidMount() {
        this.props.dispatch(Api.fetchAllCategories());
    }

    render() {
        const {data, status, classes} = this.props;
        return (
            <div>
                {status === 'loading' && <LoadingSpinner></LoadingSpinner>}
                {status === 'ok' && data && data.length &&
                <div className={classes.root}>
                    {data.map((category, index) => (
                        <ButtonBase
                            key={category.name}
                            focusRipple
                            className={classes.image}
                            style={{width: '33%',}}>

                            <Link to={`${category.path}`}>
                                <span className={classes.imageSrc}
                                      style={{backgroundImage: `url('https://picsum.photos/850/200/?image=${parseInt(index, 10) + 60}')`}}/>
                                    <span className={classes.imageBackdrop}/>
                                    <span className={classes.imageButton}>
                                    <Typography
                                        component="span"
                                        variant="subheading"
                                        color="inherit"
                                        className={classes.imageTitle}
                                    >
                                      {category.name}
                                        <span className={classes.imageMarked}/>
                                    </Typography>
                                </span>
                            </Link>
                        </ButtonBase>
                    ))}
                </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const slice = state.categories;
    return {
        ...slice
    };
}

export default withStyles(styles)(connect(mapStateToProps)(Categories));
