import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import wellnessContext from '../context/wellnessContext';

const Nav = () => {
  const { setUser, setToken } = useContext(wellnessContext); // ✅ Get these from context
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logoutFetch = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    navigate('/login'); // ✅ Redirect after logout
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Arvyax</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/mysession" className="hover:text-gray-300">My Session</Link>
          <Link to="/create-session" className="hover:text-gray-300">Create-Session</Link>
          <Link to="/draft-session" className="hover:text-gray-300">Draft</Link> 
          <button
            onClick={logoutFetch}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-2 space-y-2 px-4">
          <Link to="/" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/mysession" className="hover:text-gray-300">My Session</Link>
          <Link to="/create-session" className="hover:text-gray-300">Create-Session</Link>
          <Link to="/draft-session" className="hover:text-gray-300">Draft</Link> 
          <button
            onClick={logoutFetch}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
