import React from 'react';
import { Link } from 'react-router-dom';
import { ModeToggle } from '../components/mode-toggle'; // Adjust the path if necessary

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 rounded-lg">
      <div className="container mx-auto flex items-center justify-between rounded-lg ">
        <Link to="/" className="text-white text-lg font-bold">Home</Link>
        <div>
          {/* Add other navbar links or items here */}
          <Link to="/about" className="text-white ml-4">About</Link>
          <Link to="/contact" className="text-white ml-4 mr-4">Contact</Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
