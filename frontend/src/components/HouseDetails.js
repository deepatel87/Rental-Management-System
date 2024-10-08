import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeHouse } from "../redux/houseSlice";
import toast from "react-hot-toast";

const HouseDetails = () => {
  const houseData = useSelector((store) => store.house.houseDetails);
  const user = useSelector((store) => store.user.user);
  const isAdmin = useSelector((store) => store.user.isAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(houseData);

  const goToSendRequest = () => {
    navigate("/sendrequest");
  };

  const deleteHandler = async () => {
    const response = await fetch(
      `http://localhost:4000/api/v1/room/deleteRoom`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId: houseData._id }),
      }
    );

    const resp = await response.json();

    if (resp.success) {
      console.log("Room deleted successfully");
      dispatch(removeHouse(houseData._id));
      toast.success("Room Deleted");
      navigate("/");
    } else {
      console.log(resp);
      toast.error("Couldnt Delete Room");
    }
  };

  if (!user) {
    navigate("/login");
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6 overflow-hidden">
        {!isAdmin ? (
          <div>
            {houseData.image && (
              <img
                src={houseData.image}
                alt="House"
                className="w-full h-64 object-cover rounded-lg mb-8 shadow-md"
              />
            )}
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-4xl font-bold text-purple-800">
                Type : {houseData?.type}
              </h1>
              <p className="text-xl text-gray-700">
                Details : {houseData?.details}
              </p>
              <p className="text-xl text-gray-700">
                Address : {houseData?.address}
              </p>
              <p className="text-xl text-gray-700">
                Additional Details : {houseData.additionalDetails}
              </p>
            </div>
            <div className="bg-teal-200 p-4 rounded-lg mb-8 mt-8 shadow-md">
              <h2 className="text-2xl font-bold text-teal-800">Price</h2>
              <span className="text-4xl font-bold text-teal-800">
                ₹{houseData.rent}
              </span>
              <span className="text-teal-700 ml-2 text-lg">per month</span>
            </div>
            <button
              onClick={goToSendRequest}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full"
            >
              Get Now
            </button>
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Additional Details
              </h2>
              <p>{houseData.additionalDetails}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-8">
            <h1 className="text-4xl font-bold text-purple-800">
              {houseData.type}
            </h1>
            <p className="text-xl text-gray-700">{houseData.details}</p>
            <p className="text-xl text-gray-700">
              {houseData.additionalDetails}
            </p>
            <div className="bg-teal-200 p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-teal-800">Price</h2>
              <span className="text-4xl font-bold text-teal-800">
                ₹{houseData.rent}
              </span>
              <span className="text-teal-700 ml-2 text-lg">per month</span>
            </div>
            <img
              src={houseData.image}
              alt="House"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <button
              onClick={deleteHandler}
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full mt-8"
            >
              Delete House
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseDetails;
