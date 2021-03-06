import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LogIn from './LogIn/LogIn';
import LogOut from './LogOut/LogOut';
import getUniqueId from '../Blog/getUniqueId';

export default class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      name: '',
      password: '',
    };

    this.handleName = this.handleName.bind(this);
    this.handlePswd = this.handlePswd.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  static userId = getUniqueId('users');

  handlePswd(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleLogIn() {
    const { addUserAndLogIn } = this.props;
    const { usersList } = this.props;
    const { name, password } = this.state;
    const editName = name.trim();
    const editPassword = password.trim();

    if (editName === '' || editPassword === '') {
      return;
    }

    this.setState({
      redirectToReferrer: true,
    });

    const isUserRegistered = usersList.find(
      (user) => user.name === name && user.password === password
    );

    addUserAndLogIn({
      id: isUserRegistered ? isUserRegistered.id : (Authentication.userId += 1),
      name,
      password,
      isOnline: true,
    });
  }

  render() {
    const { isLoggedIn, logOut } = this.props;
    const { referrer } = this.props.location.state || {
      referrer: { pathname: '/blog-byNersisyan/' },
    };

    const { redirectToReferrer, name, password } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={referrer} />;
    }

    return isLoggedIn ? (
      <LogOut logOut={logOut} />
    ) : (
      <LogIn
        name={name}
        pswd={password}
        handleName={this.handleName}
        handlePswd={this.handlePswd}
        logIn={this.handleLogIn}
      />
    );
  }
}
