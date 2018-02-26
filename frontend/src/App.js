import React, {Component} from 'react';
import './App.css';
import 'typeface-roboto';
import AppHeader from './shared/Header/AppHeader';
import {withStyles} from 'material-ui/styles';
import AppMenu from "./shared/Menu/AppMenu";
import AppContent from "./shared/Content/AppContent";


const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    }
});

class App extends Component {

    state = {
        menuOpen: false
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppHeader handleDrawerOpen={this.handleDrawerOpen}></AppHeader>
                    <AppMenu handleDrawerClose={this.handleDrawerClose} menuOpen={this.state.menuOpen}></AppMenu>
                    <AppContent menuOpen={this.state.menuOpen}></AppContent>
                </div>
            </div>
        );
    }

    handleDrawerOpen = () => {
        this.setState({menuOpen: true});
    };

    handleDrawerClose = () => {
        this.setState({menuOpen: false});
    };


}

export default withStyles(styles, {withTheme: true})(App);
