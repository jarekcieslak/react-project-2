import React from 'react';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import {Route, Switch} from "react-router-dom";
import PostList from "../../post-list/PostList";
import PostDetails from "../../post-details/PostDetails";
import PostCreate from "../../post-create/PostCreate";


const drawerWidth = 240;

const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

export class AppContent extends React.Component {

  render() {
    const {menuOpen, classes} = this.props;

    return (
      <main className={classNames(classes.content, classes[`content-left`], {
        [classes.contentShift]: menuOpen,
        [classes[`contentShift-left`]]: menuOpen
      })}>
        <div className={classes.drawerHeader}/>
        <Switch>
          <Route exact path="/" render={() => (<PostList/>)}/>
          <Route exact path="/posts" render={() => (<PostList/>)}/>
          <Route exact path="/post/new" render={() => (<PostCreate/>)}/>
          <Route exact path="/:category/:id" render={() => (<PostDetails/>)}/>
        </Switch>
      </main>
    )
  }
}

export default withStyles(styles, {withTheme: true})(AppContent);
