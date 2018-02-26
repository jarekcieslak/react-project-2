import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames';
import MenuIcon from 'material-ui-icons/Menu';
import {Link} from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  logoText: {
    color: '#fff',
    'text-decoration': 'none'
  }
});

class AppHeader extends React.Component {

  render() {
    const {classes} = this.props;
    const {handleDrawerOpen, menuOpen} = this.props;

    return (
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: menuOpen,
          [classes[`appBarShift-left`]]: menuOpen,
        })}>
        <Toolbar disableGutters={!menuOpen}>
          <IconButton
            color="inherit"
            aria-label="menuOpen drawer"
            onClick={() => handleDrawerOpen()}
            className={classNames(classes.menuButton, menuOpen && classes.hide)}
          ><MenuIcon/>
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            <Link className={classes.logoText} to='/'>Readables</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }

}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeader);
