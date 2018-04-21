import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if (
         props.invalid &&
         props.touched &&
         props.shouldValidate 
        ) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select 
                    onChange={props.changed}
                    className={inputClasses.join(' ')}>
                    {props.elementConfig.options.map(option => (
                        <option 
                            key={option.value} 
                            value={option.value}>
                                {option.displayName}
                        </option>
                    ))}    
                </select>    
            );
            break;
        default:
            inputElement = <input 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} />;
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>{props.elementConfig.placeholder} can't be empty</p>;
    }    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>    
    );
}
export default input;