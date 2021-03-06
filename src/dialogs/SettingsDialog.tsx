import React, { Component, KeyboardEvent, ChangeEvent, MouseEventHandler } from 'react';

import PropTypes from 'prop-types';

import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput'
import { SelectProps } from '@material-ui/core/Select/Select'

import SwipeableViews, { OnChangeIndexCallback } from 'react-swipeable-views';

import AccountTab from '../tabs/settings/AccountTab';
import AppearanceTab from '../tabs/settings/AppearanceTab';
import { CommonColors } from '@material-ui/core/colors/common';
import { PaletteType } from '@material-ui/core';
import { ModalProps } from '@material-ui/core/Modal';
import { OnTabChange } from '../types'
import { ColorType } from '../types/index';
const styles = (theme: Theme) => ({
  tabs: {
    marginBottom: theme.spacing(1)
  }
});
interface Props extends WithStyles {
  //classes: PropTypes.object.isRequired,

  fullScreen?: boolean;
  open: boolean;

  user: firebase.User;
  isPerformingAuthAction: boolean;
  isVerifyingEmailAddress: boolean;
  colors: ColorType[];
  types: keyof PaletteType;
  primaryColor: string;
  secondaryColor: string;
  type: PaletteType;
  defaultTheme: any,
  onClose: MouseEventHandler; // ModalProps["onClose"];
  onAddAvatarClick: MouseEventHandler;
  onChangeAvatarClick: MouseEventHandler;
  onAddDisplayNameClick: MouseEventHandler;
  onChangeDisplayNameClick: MouseEventHandler;
  onAddEmailAddressClick: MouseEventHandler;
  onVerifyEmailAddressClick: MouseEventHandler;
  onPrimaryColorChange: SelectInputProps["onChange"];
  onSecondaryColorChange: SelectInputProps["onChange"];
  onTypeChange: SelectProps["onChange"];
  onResetClick: MouseEventHandler;
}
interface State {
  selectedTab: number;
}

class SettingsDialog extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedTab: 0
    };
  }

  handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter' && this.props.onClose) {
      // const reason: 'backdropClick' | 'escapeKeyDown' = 'escapeKeyDown'
      // this.props.onClose(event, reason); //todo: technically unnecessary?
      //todo: logically unnecessary, the parent controls the 'open' state // this.setState({open: false})
    }
  };

  changeTab: OnTabChange = (event: React.ChangeEvent<{}>, value: any) => {
    this.setState({
      selectedTab: value
    });
  };

  changeIndex: OnChangeIndexCallback = (index) => {
    this.setState({
      selectedTab: index
    });
  };

  handleResetClick = () => {
    const { primaryColor, secondaryColor, type, defaultTheme } = this.props;

    if (primaryColor !== defaultTheme.primaryColor || secondaryColor !== defaultTheme.secondaryColor || type !== defaultTheme.type) {
      setTimeout(this.props.onResetClick, 137.5);
    }
  };

  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const {
      fullScreen,
      open,
      user,
      isPerformingAuthAction,
      isVerifyingEmailAddress,
      colors,
      types,
      primaryColor,
      secondaryColor,
      type,
      defaultTheme
    } = this.props;

    // Events
    const {
      onClose,
      onAddAvatarClick,
      onChangeAvatarClick,
      onAddDisplayNameClick,
      onChangeDisplayNameClick,
      onAddEmailAddressClick,
      onVerifyEmailAddressClick,
      onPrimaryColorChange,
      onSecondaryColorChange,
      onTypeChange
    } = this.props;

    const { selectedTab } = this.state;

    let hasDeviatedFromDefaultSettings = false;

    if (defaultTheme) {
      hasDeviatedFromDefaultSettings = (
        primaryColor !== defaultTheme.primaryColor ||
        secondaryColor !== defaultTheme.secondaryColor ||
        type !== defaultTheme.type
      );
    }

    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={onClose} onKeyPress={this.handleKeyPress}>
        <DialogTitle>Settings</DialogTitle>

        <Tabs className={classes.tabs} indicatorColor="primary" textColor="primary" onChange={this.changeTab} value={selectedTab} variant="fullWidth">
          <Tab label="Account" />
          <Tab label="Appearance" />
        </Tabs>

        <DialogContent>
          <Hidden only="xs">
            {selectedTab === 0 &&
              <AccountTab
                user={user}
                isPerformingAuthAction={isPerformingAuthAction}
                isVerifyingEmailAddress={isVerifyingEmailAddress}
                onAddAvatarClick={onAddAvatarClick}
                onChangeAvatarClick={onChangeAvatarClick}
                onAddDisplayNameClick={onAddDisplayNameClick}
                onChangeDisplayNameClick={onChangeDisplayNameClick}
                onAddEmailAddressClick={onAddEmailAddressClick}
                onVerifyEmailAddressClick={onVerifyEmailAddressClick}
              />
            }

            {selectedTab === 1 &&
              <AppearanceTab
                colors={colors}
                types={types}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                type={type}
                onPrimaryColorChange={onPrimaryColorChange}
                onSecondaryColorChange={onSecondaryColorChange}
                onTypeChange={onTypeChange}
              />
            }
          </Hidden>

          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <SwipeableViews index={selectedTab} onChangeIndex={this.changeIndex}>
              <AccountTab
                user={user}
                isPerformingAuthAction={isPerformingAuthAction}
                isVerifyingEmailAddress={isVerifyingEmailAddress}
                onAddAvatarClick={onAddAvatarClick}
                onChangeAvatarClick={onChangeAvatarClick}
                onAddDisplayNameClick={onAddDisplayNameClick}
                onChangeDisplayNameClick={onChangeDisplayNameClick}
                onAddEmailAddressClick={onAddEmailAddressClick}
                onVerifyEmailAddressClick={onVerifyEmailAddressClick}
              />

              <AppearanceTab
                colors={colors}
                types={types}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                type={type}
                onPrimaryColorChange={onPrimaryColorChange}
                onSecondaryColorChange={onSecondaryColorChange}
                onTypeChange={onTypeChange}
              />
            </SwipeableViews>
          </Hidden>
        </DialogContent>

        {(selectedTab === 1 && hasDeviatedFromDefaultSettings) &&
          <React.Fragment>
            <Hidden only="xs">
              <DialogActions>
                <Button color="primary" variant="contained" onClick={this.handleResetClick}>Reset</Button>
              </DialogActions>
            </Hidden>

            <Hidden only={['sm', 'md', 'lg', 'xl']}>
              <DialogActions>
                <Button color="primary" onClick={onClose}>Cancel</Button>
                <Button color="primary" variant="outlined" onClick={this.handleResetClick}>Reset</Button>
                <Button color="primary" variant="contained" onClick={onClose}>OK</Button>
              </DialogActions>
            </Hidden>
          </React.Fragment>
        }

        {(selectedTab !== 1 || !hasDeviatedFromDefaultSettings) &&
          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <DialogActions>
              <Button color="primary" onClick={onClose}>Cancel</Button>
              <Button color="primary" variant="contained" onClick={onClose}>OK</Button>
            </DialogActions>
          </Hidden>
        }
      </Dialog>
    );
  }

  // static propTypes = {
  //   classes: PropTypes.object.isRequired,

  //   fullScreen: PropTypes.bool,
  //   open: PropTypes.bool.isRequired,

  //   user: PropTypes.object.isRequired,
  //   isPerformingAuthAction: PropTypes.bool.isRequired,
  //   isVerifyingEmailAddress: PropTypes.bool.isRequired,
  //   colors: PropTypes.array.isRequired,
  //   types: PropTypes.array.isRequired,
  //   primaryColor: PropTypes.string.isRequired,
  //   secondaryColor: PropTypes.string.isRequired,
  //   type: PropTypes.string.isRequired,

  //   onClose: PropTypes.func.isRequired,
  //   onAddAvatarClick: PropTypes.func.isRequired,
  //   onChangeAvatarClick: PropTypes.func.isRequired,
  //   onAddDisplayNameClick: PropTypes.func.isRequired,
  //   onChangeDisplayNameClick: PropTypes.func.isRequired,
  //   onAddEmailAddressClick: PropTypes.func.isRequired,
  //   onVerifyEmailAddressClick: PropTypes.func.isRequired,
  //   onPrimaryColorChange: PropTypes.func.isRequired,
  //   onSecondaryColorChange: PropTypes.func.isRequired,
  //   onTypeChange: PropTypes.func.isRequired,
  //   onResetClick: PropTypes.func.isRequired
  // };
}

export default withStyles(styles)(SettingsDialog);