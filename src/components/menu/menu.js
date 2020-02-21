import React from 'react';
import RcMenu, { MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';

export function Menu() {
  return (
    <RcMenu mode="inline">
      <MenuItem key="1-1"><a href='/'>Signup </a></MenuItem>
      <MenuItem key="1-2"><a href='/ProviderApplication'>Application </a></MenuItem>
    </RcMenu>
  );
}