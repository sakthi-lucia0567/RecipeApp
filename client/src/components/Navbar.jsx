import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const isLoggedIn = !!cookies.access_token;

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/signin");
  };

  useEffect(() => {
    // Update the Navbar component
  }, [isLoggedIn]);

  return (
    <nav className='bg-white  shadow dark:bg-gray-800'>
      <div className='container  flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300'>
        <Link
          to='/'
          className='text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-transparent hover:border-blue-500 mx-1.5 sm:mx-6'
        >
          Home
        </Link>

        <Link
          to='/create-recipe'
          className='border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'
        >
          Create Recipe
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              to='/saved-recipe'
              className='border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'
            >
              Saved Recipe
            </Link>
            <button
              onClick={logout}
              className='border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to='/signin'
              className='border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'
            >
              SignIn
            </Link>
            <Link
              to='/signup'
              className='border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
