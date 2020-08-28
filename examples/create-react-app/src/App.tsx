import React from 'react';

const App = () => {
  return (
    <div>
      Loaded from <mark>process.env.REACT_APP_ENCRYPTED_ENV</mark>:{' '}
      {process.env.REACT_APP_ENCRYPTED_ENV}
    </div>
  );
};

export default App;
