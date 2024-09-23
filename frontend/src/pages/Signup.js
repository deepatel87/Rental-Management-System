import React, { useRef, useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHouses } from '../redux/houseSlice';
import { setUserType } from '../redux/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const inputRefs = useRef({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function checkParams() {
    const fullName = inputRefs.current["full-name"].value;
    const email = inputRefs.current["email"].value;
    const contactNumber = inputRefs.current["contact-number"].value;
    const otp = inputRefs.current["otp"].value;
    const password = inputRefs.current["password"].value;

    if (!fullName || !email || !contactNumber || !password) {
      setError("All fields are required");
      return null;
    }

    return { fullName, email, contactNumber, otp, password };
  }

  async function submitHandler() {
    const data = checkParams();

    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          fullName: data.fullName,
          contactNumber: data.contactNumber,
          otp: data.otp,
          password: data.password,
        }),
      });
      
      const resp = await response.json();

      if (resp.success) {
        localStorage.setItem('db_token', resp.token);
        dispatch(setHouses(resp.roomDetails));
        dispatch(setUserType(resp.user.isAdmin));
        navigate("/");
      } else {
        setError(resp.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getOTPHandler = async () => {
    try {
      const data = checkParams();
      if (!data) return;

      setError("");
      const response = await fetch("http://localhost:4000/api/v1/auth/sendOTP", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });
      const resp = await response.json();
      if (!resp.success) {
        setError(resp.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold text-center text-purple-700">Signup</h2>
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="full-name"
            name="full-name"
            type="text"
            required
            placeholder="Enter your full name"
            ref={(el) => (inputRefs.current["full-name"] = el)}
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            ref={(el) => (inputRefs.current["email"] = el)}
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="contact-number" className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            id="contact-number"
            name="contact-number"
            type="tel"
            required
            placeholder="Enter your contact number"
            ref={(el) => (inputRefs.current["contact-number"] = el)}
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Enter Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            ref={(el) => (inputRefs.current["password"] = el)}
            className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
          />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 items-center">
          <button
            type="button"
            className="col-span-1 px-4 py-2 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={getOTPHandler}
          >
            Get OTP
          </button>
          <input
            id="otp"
            name="otp"
            type="text"
            required
            placeholder="Enter OTP"
            ref={(el) => (inputRefs.current["otp"] = el)}
            className="col-span-2 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
          />
        </div>
        <div>
          <button
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={submitHandler}
          >
            Sign Up
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">OR</span>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
