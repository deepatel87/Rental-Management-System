import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setHouseDetails } from "../redux/houseSlice";
import { setcurrRequest } from '../redux/requestSlice';

const Requests = () => {
  const isAdmin = useSelector((store)=>store.user.isAdmin)
  const requests = useSelector((store) => store.request.requests);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(requests)

  function houseDetails(house) {
    dispatch(setHouseDetails(house.houseId));
    navigate("/housedetails/view");
  }

  function profileDetails(person, house, id) {
    dispatch(setcurrRequest({ person, house, id }));
    navigate("/profile"); 
  }

  if(!isAdmin){
    return <div>Nothing Here</div>
  }

  return (
    <div className="p-6 bg-gradient-to-r from-purple-300 to-purple-500 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Requests</h1>
      <div className="space-y-4">
        {requests.map((request, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
             
              <div>
                <h2 className="text-lg font-semibold text-purple-800">{request.userId.fullName}</h2>
                <p className="text-gray-600">{request.houseId.name}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow transition duration-200 hover:bg-blue-600"
                onClick={() => profileDetails(request.userId, request.houseId, request._id)}
              >
                View Profile
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow transition duration-200 hover:bg-green-600"
                onClick={() => houseDetails(request)}
              >
                View House Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
