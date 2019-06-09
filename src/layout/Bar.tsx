import React, { Component, MouseEventHandler} from 'react';

import PropTypes from 'prop-types';

import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import PersonIcon from '@material-ui/icons/Person';

const styles = (theme: Theme) => ({
  signUpButton: {
    marginRight: theme.spacing(1)
  }
});

interface BarProps extends WithStyles {
  name: string;
  isPerformingAuthAction : boolean;
  isSignedIn: boolean;
  user: firebase.User;
  onSettingsClick: MouseEventHandler;
  onSignOutClick: MouseEventHandler;
  onSignUpClick: MouseEventHandler; 
  onSignInClick: MouseEventHandler;
}
interface BarState {
  menu: Partial<MenuProps>
}

const initStateMenu: Partial<MenuProps> = {
  anchorEl: null
}

class Bar extends Component<BarProps, BarState> {
  
  constructor(props: BarProps) {
    super(props);

    this.state = {
      menu: initStateMenu
    };
  }

  openMenu: MouseEventHandler = (event) => {
    const anchorEl = event.currentTarget;

    this.setState({
      menu: {
        anchorEl
      }
    });
  };

  closeMenu = () => {
    this.setState({
      menu: {
        anchorEl: null
      }
    });
  };

  handleSettingsClick:MouseEventHandler = (e) => {
    this.closeMenu();
    this.props.onSettingsClick(e);
  };

  handleSignOutClick:MouseEventHandler = (e) => {
    this.closeMenu();
    this.props.onSignOutClick(e);
  };

  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { name, isPerformingAuthAction, isSignedIn, user } = this.props;

    // Events
    const { onSignUpClick, onSignInClick } = this.props;

    const { menu } = this.state;

    return (
      <AppBar color="primary" position="static">
        <Toolbar variant="regular">
          <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">{name}</Typography>

          {isSignedIn &&
            <React.Fragment>
              <IconButton color="inherit" disabled={isPerformingAuthAction} onClick={this.openMenu}>
                {user.photoURL ? <Avatar alt="Avatar" src={user.photoURL} /> : <PersonIcon />}
              </IconButton>

              <Menu anchorEl={menu.anchorEl} open={Boolean(menu.anchorEl)} onClose={this.closeMenu}>
                <MenuItem disabled={isPerformingAuthAction} onClick={this.handleSettingsClick}>Settings</MenuItem>
                <MenuItem disabled={isPerformingAuthAction} onClick={this.handleSignOutClick}>Sign out</MenuItem>
              </Menu>
            </React.Fragment>
          }

          {!isSignedIn &&
            <React.Fragment>
              <Button className={classes.signUpButton} color="secondary" disabled={isPerformingAuthAction} variant="contained" onClick={onSignUpClick}>Sign Up</Button>
              <Button color="secondary" disabled={isPerformingAuthAction} variant="contained" onClick={onSignInClick}>Sign In</Button>
            </React.Fragment>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

// Bar.propTypes = {
//   classes: PropTypes.object.isRequired,
  
//   name: PropTypes.string.isRequired,
//   isPerformingAuthAction: PropTypes.bool.isRequired,
//   isSignedIn: PropTypes.bool.isRequired,

//   onSettingsClick: PropTypes.func.isRequired,
//   onSignOutClick: PropTypes.func.isRequired
// };

export default withStyles(styles)(Bar);