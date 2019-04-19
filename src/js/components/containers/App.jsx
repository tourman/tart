import React from 'react';
import AppWrapper from '../presents/AppWrapper';
import Tart from './Tart';

const App = props => {
  return (
    <React.StrictMode>
      <AppWrapper>
        <Tart />
      </AppWrapper>
    </React.StrictMode>
  );
};

export default App;
