import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';

const withDetails = (Details) => {
  
  return class extends Component {

    state = {
      item: {},
      image: null,
      error: false,
    }
  
    onDataLoaded = (item) => {
      const { getImageUrl } = this.props;
      this.setState({ 
        item,
        image: getImageUrl(item),
      });
    }

    onError = () => {
      this.setState({
        error: true,
      });
    }

    componentDidMount() {
      this.upDateItem();
    }
  
    componentDidUpdate(prevProps) {
      if (this.props.itemId !== prevProps.itemId
          || this.props.getData !== prevProps.getData
          || this.props.getImageUrl !== prevProps.getImageUrl) {
        this.upDateItem();
      }
    }

    upDateItem() {
      const { itemId, getData } = this.props;
      if (!itemId) {
        return;
      }
  
      getData(itemId)
        .then(this.onDataLoaded)
        .catch(this.onError);
    }

    render() {
      const { item, image, error} = this.state;

      if (error) {
        return <ErrorIndicator />
      }

      return (
        <div className='item-details card'>
          <Details item={item} image={image} />
        </div>
      );
    }
  }
}

export default withDetails;
