import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import './error-boundry.css';

export default class ErrorBoundry extends Component {
  
  state = {
    error: false,
  }

  componentDidCatch(err, info) {
    debugger;
    this.setState({
      error: true
    });
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <ErrorIndicator />
    }

    return this.props.children;
  }
}
