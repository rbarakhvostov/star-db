import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {

  return class extends Component {

    state = {
      data: null,
    }
    
    componentDidMount() {
  
      this.props.getData()
        .then((data) => {
          this.setState({ 
            data,
          });
      });
    }

    render() {
      
      const { data } = this.state;
      const { onItemSelected } = this.props;

      if (!data) {
        return <Spinner />
      }

      return <View onItemSelected={onItemSelected} data={data} />
    }
  }
}

export default withData;