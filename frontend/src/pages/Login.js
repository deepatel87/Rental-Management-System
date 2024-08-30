import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setHouses } from '../redux/houseSlice';
import { setUserType , addUser, setTenants } from '../redux/userSlice';
import { setRequests } from '../redux/requestSlice';



const Login = () => {

  const inputRefs = useRef({});
  const navigate = useNavigate( )
  const dispatch = useDispatch()




  function loginHandler() {
  
    const email = inputRefs.current['email'].value;
    const password = inputRefs.current['password'].value;

    if (!email || !password) {
      return;
    }


    login(email , password)

  }

  async function login(email, password) {
    const response = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({email: email, password:password }),
    });

    const resp = await response.json();

    if (resp.success) {
      localStorage.setItem('db_token' , resp.token)
      console.log(resp)
      console.log("hiiiiiiiiii")
      dispatch(setHouses(resp.roomDetails))
      navigate("/")
      dispatch(setUserType(resp.user.isAdmin))
      dispatch(setRequests(resp.requests))
      dispatch(setTenants(resp.tenants))


      if(resp.user.isAdmin){
        console.log("hellooooooooooooooooo")
        console.log(resp.requests)


      }
    dispatch(addUser(resp.user))

    } else {
      console.log(resp)
      //tost error
    }
  }

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#bfdbf7]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#466b90] rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
     
        <div>
          <label htmlFor="email-or-phone" className="block text-sm font-medium text-white">
            Email or Phone Number
          </label>
          <input
            id="email-or-phone"
            name="email-or-phone"
            type="text"
            required
            placeholder="Enter your email or phone number"
            ref={(el) => (inputRefs.current['email'] = el)}
            className="w-full px-3 py-2 mt-1 text-white outline-none bg-[#0f2740] border-gray-500 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            ref={(el) => { inputRefs.current['password'] = el; }}
            className="outline-none bg-[#0f2740] w-full px-3 py-2 mt-1 text-white border border-gray-500 rounded-md"
          />
          <div className="mt-2 text-sm text-left">
            <p to="/forgot-password" className="text-indigo-400 hover:underline">
              Forgot password?
            </p>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-[#0f2740] rounded-md hover:bg-[#1a3241] focus:ring focus:ring-indigo-400"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-500"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-300">OR</span>
          </div>
        </div>
        
        <div className="mt-6 text-center text-white">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-400 hover:underline">
              Create Account
            </Link>
          </p>
        </div>


        </div>
      </div>
  );
};

export default Login; 