import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withDetails =  (Details, getData, getImageUrl) => {
  
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
  
      if (this.props.itemId !== prevProps.itemId) {
        this.setState({
          loading: true
        });
        this.upDateItem();
      }
    }
  
    upDateItem() {
    
      const { itemId } = this.props;
  
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
    
      const data = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, { item });
      });
      
      const spinner = loading ? <Spinner /> : null;
      const body = !loading 
                      ? <Details item={item} image={image} data={data} />
                      : null;
      
      return (
        <div className='person-details card'>
          { body }
          { spinner }
        </div>
      );
    }
  }
}

export default withDetails;