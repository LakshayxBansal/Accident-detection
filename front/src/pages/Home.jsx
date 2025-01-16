import React from 'react';
import HomeComp1 from './Home-components/Home-comp-1';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-4xl mb-16">
        <HomeComp1 />
      </div>
      
    </div>
  );
};

export default Home;
