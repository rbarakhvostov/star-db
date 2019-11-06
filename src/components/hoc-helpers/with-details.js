import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withDetails = (Details) => {
  
  return class extends Component {

    state = {
      item: {},
      loading: false,
      image: null,
    }
  
    componentDidMount() {
      this.upDateItem();
    }
  
    componentDidUpdate(prevProps) {
      if (this.props.itemId !== prevProps.itemId 
          || this.props.getData !== prevProps.getData
          || this.props.getImageUrl !== prevProps.getImageUrl) {
        // this.setState({
        //   loading: true
        // });
        this.upDateItem();
      }
    }
  
    upDateItem() {
      const { itemId, getData, getImageUrl } = this.props;

      if (!itemId) {
        return;
      }
  
      getData(itemId)
        .then((item) => {
          this.setState({ 
            item,
            loading: false,
            image: getImageUrl(item),
          });
      });
    }

    render() {
      const { item, loading, image} = this.state;
          
      const spinner = loading ? <Spinner /> : null;
      const body = !loading 
                      ? <Details item={item} image={image} />
                      : null;

      return (
        <div className='item-details card'>
          { body }
          { spinner }
        </div>
      );
    }
  }
}

export default withDetails;
