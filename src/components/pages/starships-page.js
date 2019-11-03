import React, { Component } from 'react';
import { StarshipList, StarshipDetails } from '../sw-components';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundary from '../error-boundary';

export default class StarshipsPage extends Component {

  swapiService = new SwapiService();
  
  state = {
    selectedItem: null,
  }

  onItemSelected = (selectedItem) => {
    this.setState({
      selectedItem,
    });
  }

  render() {
    const { selectedItem } = this.state;
    
    const starshipList = (
      <StarshipList onItemSelected={this.onItemSelected} />
    );
    
    const starshipDetails = (
      <StarshipDetails itemId={selectedItem} />
    );

    return (
      <ErrorBoundary>
        <Row left={starshipList} right={starshipDetails} />
      </ErrorBoundary>
    )
  }
}
