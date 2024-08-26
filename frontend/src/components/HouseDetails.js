import React from "react";
import { useSelector } from "react-redux";

const HouseDetails = () => {
  const houseData = useSelector((store) => store.house.houseDetails);
  console.log(houseData);

  if (!houseData) return;

  return (
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
          <div className="bg-teal-200 p-4 rounded-lg mb-6">
            <span className="text-3xl font-bold text-teal-800">
              ₹{houseData.house_price.toLocaleString()}
            </span>
            <span className="text-teal-700 ml-2 text-lg">per month</span>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full">
            Get Now
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Additional Details
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
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

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Nearby Amenities
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
          <li>Shopping malls within 2 km radius</li>
          <li>Public parks and jogging tracks nearby</li>
          <li>Reputed schools and colleges within a 5-minute drive</li>
          <li>Easy access to public transport and major highways</li>
          <li>Restaurants, cafes, and entertainment zones close by</li>
        </ul>
      </div>
    </div>
  );
};

export default HouseDetails;
