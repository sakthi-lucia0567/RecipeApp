import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

const Login = () => {
  const [_, setCookie] = useCookies("access_token");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get("username");
    const password = form.get("password");
    console.log("data coming from form", { username, password });

    const data = {
      username,
      password,
    };
    console.log("data", data);
    await axios
      .post("http://localhost:8000/auth/login", data)
      .then((response) => {
        enqueueSnackbar("Login Successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        console.log(response.data);
        setCookie("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar("User Not Exist", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        console.log(err);
      });
  };

  return (
    <div className='w-full mt-16 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'>
      <div className='px-6 py-4'>
        <h3 className='mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200'>
          Welcome Back
        </h3>

        <p className=' text-center mt-1 text-gray-500 dark:text-gray-400'>
          Login
        </p>

        <form onSubmit={handleSubmit}>
          <div className='w-full mt-4'>
            <input
              className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
              type='text'
              name='username'
              placeholder='username'
              aria-label='username'
            />
          </div>

          <div className='w-full mt-4'>
            <input
              className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
              type='password'
              name='password'
              placeholder='Password'
              aria-label='Password'
            />
          </div>

          <div className='flex items-center justify-between mt-4'>
            <a
              href='#'
              className='text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500'
            >
              Forget Password?
            </a>

            <button className='px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className='flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700'>
        <span className='text-sm text-gray-600 dark:text-gray-200'>
          Don't have an account?{" "}
        </span>

        <Link
          to={"/signup"}
          className='mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline'
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
