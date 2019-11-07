import React from 'react';
import { withRouter } from 'react-router-dom';
import { PersonList, PersonDetails } from '../sw-components';
import Row from '../row';
import ErrorBoundary from '../error-boundary';

const PeoplePage = ({ history, match }) => {
  const { id } = match.params;
  const personList = (
    <PersonList onItemSelected={(id) => history.push(id)} />
  );
  
  const personDetails = (
    <PersonDetails itemId={id} />
  );

  return (
    <ErrorBoundary>
      <Row left={personList} right={personDetails} />
    </ErrorBoundary>
  );
}

export default withRouter(PeoplePage);
