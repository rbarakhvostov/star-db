import React, { Component } from 'react';
import { PlanetList, PlanetDetails } from '../sw-components';
import Row from '../row';
import ErrorBoundary from '../error-boundary';

export default class PlanetsPage extends Component {

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
    
    const planetList = (
      <PlanetList onItemSelected={this.onItemSelected} />
    );
    
    const planetDetails = (
      <PlanetDetails itemId={selectedItem} />
    );

    return (
      <ErrorBoundary>
        <Row left={planetList} right={planetDetails} />
      </ErrorBoundary>
    )
  }
}
