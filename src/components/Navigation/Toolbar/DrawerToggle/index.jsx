import React from 'react';

import classes from './DrawToggle.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.close}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;