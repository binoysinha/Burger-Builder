import React from 'react';

import burgerLogo from '@/assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={[classes.Logo, classes[props.orientation]].join(' ')} >
        <img src={burgerLogo} alt="logo" />
    </div>    
);

export default logo;