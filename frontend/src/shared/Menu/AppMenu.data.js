// This file is shared across the demos.

import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import TextsmsIcon from 'material-ui-icons/Textsms';
import AssessmentIcon from 'material-ui-icons/Assessment';
import SettingsIcon from 'material-ui-icons/Settings';
import {Link} from "react-router-dom";

export const menuItems = (
  <div>
    <Link style={{textDecoration: 'none'}} to="/">
      <ListItem button>
        <ListItemIcon>
          <TextsmsIcon/>
        </ListItemIcon>
        <ListItemText primary="Posts"/>
      </ListItem>
    </Link>
    <Link style={{textDecoration: 'none'}} to="/categories">
      <ListItem button>
        <ListItemIcon>
          <AssessmentIcon/>
        </ListItemIcon>
        <ListItemText primary="Categories"/>
      </ListItem>
    </Link>
    <Link style={{textDecoration: 'none'}} to="/settings">
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon/>
        </ListItemIcon>
        <ListItemText primary="Settings"/>
      </ListItem>
    </Link>
  </div>
);
