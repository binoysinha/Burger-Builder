import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from '@/hoc/asyncComponent';
import * as actions from '@/store/actions';
import Layout from '@/hoc/Layout';
import BurgerBuilder from '@/containers/BurgerBuilder';
import Logout from '@/containers/Auth/Logout';

const asyncCheckout = asyncComponent(() => {
  return import ('@/containers/Checkout');
});

const asyncAuth = asyncComponent(() => {
  return import ('@/containers/Auth');
});

const asyncOrders = asyncComponent(() => {
  return import ('@/containers/Orders');
});
class App extends Component {

  componentDidMount() {
    console.log('app');
    this.props.onCheckAuthStatus();
  }

  render() {

    let routes = (
      <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
      )
    }
    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onCheckAuthStatus: () => dispatch(actions.checkAuthStatus())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
