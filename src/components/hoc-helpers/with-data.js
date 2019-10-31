import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {

  return class extends Component {

    state = {
      data: null,
      loading: true,
      error: false,
    }
    
    onDataLoaded = (data) => {
      this.setState({ 
        data,
        loading: false,
      });
    }
    
    onError = () => {
      this.setState({
        error: true,
        loading: false,
      });
    }

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.upDateList();
      }
    }

    componentDidMount() {
      this.upDateList();
    }

    upDateList() {
      this.props.getData()
        .then(this.onDataLoaded)
        .catch(this.onError);
    }

    render() {
      const { data, loading, error } = this.state;
      const { onItemSelected } = this.props;

      if (loading) {
        return <Spinner />
      }
      
      if (error) {
        return <ErrorIndicator />
      }

      return <View onItemSelected={onItemSelected} data={data} />
    }
  }
}

export default withData;