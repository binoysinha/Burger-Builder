import React, { Component } from 'react';

import axios from '@/axios-order';
import Modal from '@/components/UI/Modal';

const withErrorHandler = (WrappedComponent) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error});
            });
        }

        componentWillUnmount() {
            // console.log('UNMOUNT', this.reqInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        closeModalHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <React.Fragment>
                    <Modal showModal={this.state.error} closeModal={this.closeModalHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>    
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;