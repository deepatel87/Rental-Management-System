import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHouseDetails } from "../redux/houseSlice";
import { setcurrRequest } from '../redux/requestSlice';

const Requests = () => {
  const requests = useSelector((store) => store.request.requests);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(requests[0])

  function houseDetails(house){
    dispatch(setHouseDetails(house));
    navigate("/housedetails/:edit");

  }


  function profileDetails(person ,house , id ){
    console.log(person)
    console.log(house ) 
    dispatch(setcurrRequest({person , house , id}));
    navigate("/userprofile/:user") 


  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Requests</h1>
      <div className="space-y-4">
        {requests.map((request, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={request.userId.image}
                alt={request.userId.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />
             
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={()=>{profileDetails(request.userId , request.houseId , request._id)}}>
                View Profile
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" onClick={()=>{houseDetails(request.houseId)}}>
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
