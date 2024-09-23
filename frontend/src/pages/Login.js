import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setHouses } from '../redux/houseSlice';
import { setUserType, addUser, setTenants } from '../redux/userSlice';
import { setRequests } from '../redux/requestSlice';
import { setRentedRoom } from '../redux/houseSlice';

const Login = () => {
  const inputRefs = useRef({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function loginHandler() {
    const email = inputRefs.current['email'].value;
    const password = inputRefs.current['password'].value;

    if (!email || !password) {
      return;
    }

    login(email, password);
  }

  async function login(email, password) {
    const response = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const resp = await response.json();

    if (resp.success) {
      console.log(resp)
      localStorage.setItem('db_token', resp.token);
      dispatch(setHouses(resp.roomDetails));
      navigate('/');
      dispatch(setUserType(resp.user.isAdmin));
      dispatch(setRequests(resp.requests));
      dispatch(setTenants(resp.tenants));
      dispatch(setRentedRoom(resp.rentedRoom?.rentHistory));

      dispatch(addUser(resp.user));
    } else {
      console.log(resp);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-purple-700">Login</h2>

        <div className="mt-4">
          <label htmlFor="email-or-phone" className="block text-sm font-medium text-gray-700">
            Email or Phone Number
          </label>
          <input
            id="email-or-phone"
            name="email-or-phone"
            type="text"
            required
            placeholder="Enter your email or phone number"
            ref={(el) => (inputRefs.current['email'] = el)}
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            ref={(el) => {
              inputRefs.current['password'] = el;
            }}
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
          />
         
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        
        </div>
        
        <div className="mt-6 text-center text-gray-600">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
