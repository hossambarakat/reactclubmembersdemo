import React from 'react';
import { Provider } from 'react-redux';
import Club from './club'
import showResults from './showresults';

const Root = ({ store }) => (
    <Provider store={store}>
      <Club onSubmit={showResults} />
    </Provider>
);

export default Root;