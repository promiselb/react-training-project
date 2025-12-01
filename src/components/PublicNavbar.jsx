import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { HiOutlineBell } from "react-icons/hi";
import { useAuth } from "../hooks/useAuth";
import Reloading from './Reloading';

/*
TODO: Add more links to the navbar

*/

function PublicNavbar() {
  const {user, loading, error, isAuthenticated} = useAuth();
  // console.log(user)

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  }
  if (loading) {
    return <Reloading loading={loading} />;
  }

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

            {/* Right: Notification + Profile */}
              { isAuthenticated ? (
                <div className="flex items-center gap-6">
                  <Link to="/profile" >
                  <span className="text-white font-medium">Welcome, 
                    {user ? (
                      user.username ? " " + user.username : " User"
                    ) : ("")}</span>
                    </Link>
                  <button className="text-white hover:text-gray-200 relative">
                    <HiOutlineBell className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                      3
                    </span>
                  </button>
            
                  <Link to="/profile" >
                  <img
                    // src="..\assets\images\placeholder.png"
                    src='src/assets/images/staff-placeholder.png' 
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  </Link>
              </div>
              ) : (
                ""
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default PublicNavbar