import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '@/store/actions';

class Index extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(actions.checkAuthTimeout(0))
});

export default connect(null, mapDispatchToProps)(Index);