import React from 'react';
import HomeComp2 from './Home-components/Home-com-2';
import HomeComp1 from './Home-components/Home-comp-1';
import Home3 from './Home-components/Home-com-3';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <HomeComp1 />
      </div>
    </div>
  );
};

export default Home;
