import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const HouseDetails = () => {
  const houseData = useSelector((store) => store.house.houseDetails);
  const userType = useSelector((store) => store.user.user);
  const navigate = useNavigate();

  const { params } = useParams();
  const name = decodeURIComponent(params);

  // if (!houseData) return;

  const goToSendRequest = () => {
    navigate("/sendrequest/:add");
  };

  return (
    <div className="w-full min-h-screen">
      {userType === "user" ? (
        <div className="w-full min-h-screen flex flex-col bg-gray-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={houseData.house_pic}
                alt={houseData.house_name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-purple-700 mb-4">
                {houseData.house_name}
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                {houseData.house_details}
              </p>
              <p className="text-xl text-gray-700 mb-6">
                {houseData.house_address}
              </p>
              <div className="bg-teal-200 p-4 rounded-lg mb-6">
                <span className="text-3xl font-bold text-teal-800">
                  ₹{houseData.house_price.toLocaleString()}
                </span>
                <span className="text-teal-700 ml-2 text-lg">per month</span>
              </div>
              <button
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full"
                onClick={goToSendRequest}
              >
                Get Now
              </button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Additional Details
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
              {/*You can add here additional details from api of house details shown below*/}
              {houseData?.additional_details}
              <li>Spacious living area with large windows for natural light</li>
              <li>Modern kitchen with top-of-the-line appliances</li>
              <li>24/7 security with CCTV surveillance</li>
              <li>Covered parking space for two cars</li>
              <li>
                Located in a prime area close to schools, hospitals, and markets
              </li>
              <li>Well-maintained garden and children’s play area</li>
              <li>Dedicated power backup and water supply</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="w-11/12 p-10">
          <input
            type="text"
            placeholder=""
            className="border border-gray-300 rounded w-full p-2 text-4xl font-bold text-purple-700 mb-4"
          />
          <textarea
            placeholder=""
            className="border border-gray-300 rounded w-full p-2 text-xl text-gray-700 mb-6"
          ></textarea>
          <input
            type="text"
            placeholder=""
            className="border border-gray-300 rounded w-full p-2 text-xl text-gray-700 mb-6"
          />
          <div className="bg-teal-200 p-4 rounded-lg mb-6">
            <input
              type="number"
              placeholder=""
              className="border-none bg-transparent text-3xl font-bold text-teal-800 w-full"
            />
            <span className="text-teal-700 ml-2 text-lg">per month</span>
          </div>
          <textarea
            placeholder=""
            className="border border-gray-300 rounded w-full p-2 text-xl text-gray-700 mb-6"
          ></textarea>
          <button
            className="bg-gradient-to-r from-purple-500 capitalize to-indigo-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full"
            // Add onClick handler to save changes
          >
            {name.substring(1)}
          </button>
        </div>
      )}
    </div>
  );
};

export default HouseDetails;
