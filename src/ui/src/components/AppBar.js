import React from 'react';
import { AppBar } from 'react-admin';
import Menu from './Menu';

const CustomAppBar = props => <AppBar {...props} userMenu={<Menu />} />;
export default CustomAppBar;