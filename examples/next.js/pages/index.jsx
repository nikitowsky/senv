const Home = () => {
  return (
    <div>
      Loaded from <mark>process.env.NEXT_PUBLIC_ENCRYPTED_ENV</mark>:{' '}
      {process.env.NEXT_PUBLIC_ENCRYPTED_ENV}
    </div>
  );
};

export default Home;
