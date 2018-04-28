import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '@/store/actions';
import { createInputObj, checkValidity } from '@/utils/helper';
import Button from '@/components/UI/Button';
import classes from './Auth.css';
// import Spinner from '@/components/UI/Spinner';
import Input from '@/components/UI/Input';
class Auth extends Component {
    
    state = {
        controls: {
            email: createInputObj('E-mail', 'email'),
            password: {...createInputObj('Password', 'password'), validation:{ required: true, minLength: 7}},
        },
        isSignup: true
    }

    loginHandler = (event) => {
        event.preventDefault();
        const authMode = this.state.isSignup ? 'signupNewUser': 'verifyPassword' 
        console.log(authMode);
        const { email, password } = this.state.controls;
        this.props.onAuth(email.value, password.value, authMode);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => ({
            isSignup: !prevState.isSignup
        }));
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls});
        
    }

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            <form onSubmit={this.loginHandler}>
                {formElements.map(({ config, id }) => (
                    <Input 
                        elementType={config.elementType} 
                        elementConfig={config.elementConfig}
                        value={config.value} 
                        touched={config.touched}
                        key={id}
                        shouldValidate={config.validation}
                        invalid={!config.valid}
                        changed={(event) => {this.inputChangedHandler(event, id)}}
                    />
                ))}
                <Button btnType="Success">Submit</Button>
            </form>
        );

        return (
            <div className={classes.Auth}>
                <p>{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</p>
                {form}
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">
                    Switch to {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onAuth: (email, pwd, authMode) => dispatch(actions.auth(email, pwd, authMode))
});

export default connect(null, mapDispatchToProps)(Auth);