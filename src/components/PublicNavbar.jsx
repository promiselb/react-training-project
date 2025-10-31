import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

/*
TODO: Add more links to the navbar

*/

function PublicNavbar() {
  const linkCLass =  ({ isActive}) => isActive ?  
                  'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' :
                  'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';
  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-10 w-auto"
                src={logo}
                alt=" GearRent — Camera & Gear Rental Dashboard"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                 GearRent — Camera & Gear Rental Dashboard
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={linkCLass}>
                    Home
                </NavLink>
                <NavLink
                  to="/signin"
                  className={linkCLass}>
                    Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className={linkCLass}>
                    Sign Up
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={linkCLass}>
                    Dashboard
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default PublicNavbar