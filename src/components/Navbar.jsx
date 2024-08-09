import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import logo from '../assets/d9691fbd-2061-4573-b2e9-85d30d67215f.jpeg';
import { UseAuthContext } from "../hook/UseAuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dispatch,user } = UseAuthContext();
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const navLinks = document.getElementsByClassName('nav-link');
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', closeMenu);
    }

    return () => {
      for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].removeEventListener('click', closeMenu);
      }
    };
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  

  return (
    <div>
      <nav className="flex flex-col md:flex-row items-center justify-between bg-blue-400 p-2 space-x-0 lg:space-x-10">
        <div className="flex items-center justify-between w-full md:w-auto">
         <div className='pl-10' >
        <div className=''>
        <img src={""} alt="Company Logo" className="object-cover object-center w-20 h-10" />
        </div>
          <a href="/" className="flex items-center space-x-1">
            
            <span className="text-md text-white font-bold capitalize ">Margrace</span>
          </a>
         </div>

          <div className="flex md:hidden">
            <button id="hamburger" onClick={toggleMenu}>
              <div className={`menu-icon text-white ${menuOpen ? 'hidden' : 'block'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
              </div>
              <div className={`close-icon text-white ${menuOpen ? 'block' : 'hidden'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className={`w-full md:w-auto flex-col md:flex-row items-center justify-center ${menuOpen ? 'flex' : 'hidden md:flex'}`}>
          <div className="flex flex-col md:flex-row text-left md:text-center mt-5 md:mt-0 md:border-none lg:justify-center" style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}>
            <Link to="/" className="nav-link block md:inline-block text-white text-md font-semibold hover:text-black px-3 py-3 md:border-none">Home</Link>
            <Link to="/trips" className="nav-link block md:inline-block text-white text-md font-semibold hover:text-black px-3 py-3 md:border-none">Trips</Link>
            {user ? ( <Link to="/trips" className="nav-link block md:inline-block text-white text-md font-semibold hover:text-black px-3 py-3 md:border-none">Trips</Link>
              ) : 
              null
             }
            <Link to="/vehicles" className="nav-link block md:inline-block text-white text-md font-semibold hover:text-black px-3 py-3 md:border-none">Vehicles</Link>
            <Link to="/contact" className="nav-link block md:inline-block text-white text-md font-semibold hover:text-black px-3 py-3 md:border-none">Contact</Link>
            {user ? (
               <button onClick={handleLogout} className="nav-link block md:hidden text-white text-md font-semibold hover:text-black px-3 py-3 md:border-none">Logout</button>     
            ) : (
              <Link  to="/login" className="nav-link block md:hidden text-white text-md font-semibold hover:text-black px-3 py-3 md:border-none">Sign In</Link>
            )}
          </div>
        </div>

        {user ? (
         <button onClick={handleLogout} className="nav-link hidden sm:block text-white text-md font-semibold hover:text-black px-3 py-3 md:border-none">Logout</button>     
        ):(
          <Link to="/login" className="py-2 px-2 rounded-md bg-white text-black hover:text-blue-600 transition-all duration-300 hidden sm:block"> Sign In</Link>
          )}



        

      </nav>
    </div>
  );
}

export default Navbar;