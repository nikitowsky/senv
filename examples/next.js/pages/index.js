import React from 'react';

const Home = () => {
  return (
    <div>
      Loaded from <i>process.env.NEXT_PUBLIC_ENCRYPTED_ENV</i>:{' '}
      {process.env.NEXT_PUBLIC_ENCRYPTED_ENV}
    </div>
  );
};

export default Home;
