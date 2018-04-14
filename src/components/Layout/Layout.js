import React from 'react';

import classes from './Layout.css';

const layout = ({ children }) => (
    <React.Fragment>
        <div>ToolBar, SideDrawer</div>
        <main className={classes.Content}>
            {children}
        </main>
    </React.Fragment>    
);

export default layout;