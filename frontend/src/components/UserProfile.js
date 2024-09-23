import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeRequest } from '../redux/requestSlice';
import { addTenant } from '../redux/userSlice';
import { removeHouse } from '../redux/houseSlice';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate() ;
  const isAdmin = useSelector((store)=>store.user.isAdmin)


  let person = useSelector((store) => store.request.currRequest);
  let house = person.house._id;
  const id = person.id;
  person = person.person;

  const inputRefs = useRef({
    aadharNo: null,
    address: null,
    relativeNo: null,
    relation: null,
    occupation: null,
    numberOfPeople: null,
  });

 

  async function acceptHandler() {
    const response = await fetch('http://localhost:4000/api/v1/admin/acceptRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId: id }),
    });

    const resp = await response.json();

    if(resp.success){
    dispatch(addTenant(resp.populatedTenant));
    dispatch(removeRequest({ req: "accept", userId: person._id }));
    dispatch(removeHouse(house));
    toast.success("Request Accepted")

    navigate("/")
    } else {
      toast.error("Couldn't Accept Request")
    }
  }

  async function rejectHandler() {
    const response = await fetch('http://localhost:4000/api/v1/admin/rejectRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId: id }),
    });

    const data = await response.json()

    if(data.success){

    dispatch(removeRequest({ req: "reject", reqId: id }));
    toast.success("Request Rejected")
    navigate("/")
    } else {
      toast.error("Couldn't Reject Request")
    }

  }

  if(!isAdmin){
    return <div>Nothing Here</div>
  }


  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-300 to-purple-500 min-h-screen p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">User Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg text-black">
        <h3 className="text-2xl font-semibold mb-4">User Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">Name:</label>
            <input
              type="text"
              ref={(el) => (inputRefs.current.name = el)}
              className="border border-gray-300 rounded w-full p-2 placeholder-gray-500"
              disabled
              placeholder={person?.fullName || 'Name'}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Contact No:</label>
            <input
              type="text"
              ref={(el) => (inputRefs.current.contactNo = el)}
              className="border border-gray-300 rounded w-full p-2 placeholder-gray-500"
              disabled
              placeholder={person?.contactNumber || 'Contact No'}
            />
          </div>
          <div className="col-span-2">
            <label className="block font-semibold mb-2">Email:</label>
            <input
              type="email"
              ref={(el) => (inputRefs.current.email = el)}
              className="border border-gray-300 rounded w-full p-2 placeholder-gray-500"
              disabled
              placeholder={person?.email || 'Email'}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Aadhar No:</label>
            <input
              type="text"
              ref={(el) => (inputRefs.current.aadharNo = el)}
              className="border border-gray-300 rounded w-full p-2 placeholder-gray-500"
              disabled
              placeholder={person?.aadharNumber || 'Aadhar No'}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Relative No.:</label>
            <input
              type="text"
              ref={(el) => (inputRefs.current.relativeNo = el)}
              className="border border-gray-300 rounded w-full p-2 placeholder-gray-500"
              disabled
              placeholder={person?.relativeNumber || 'Relative No.'}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Relation:</label>
            <input
              type="text"
              ref={(el) => (inputRefs.current.relation = el)}
              className="border border-gray-300 rounded w-full p-2 placeholder-gray-500"
              disabled
              placeholder={person?.relation || 'Relation'}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Occupation:</label>
            <input
              type="text"
              ref={(el) => (inputRefs.current.occupation = el)}
              className="border border-gray-300 rounded w-full p-2 placeholder-gray-500"
              disabled
              placeholder={person?.occupation || 'Occupation'}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">No. of People:</label>
            <input
              type="number"
              ref={(el) => (inputRefs.current.numberOfPeople = el)}
              className="border border-gray-300 rounded w-full p-2 placeholder-gray-500"
              disabled
              placeholder={person?.noOfPeople || 'No. of People'}
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <div className="w-32 h-32 border border-gray-300 rounded bg-gray-100 flex items-center justify-center" onClick={() => { window.open(person?.aadharImage || '', "_blank") }}>
              <img src={person?.aadharImage || ''} alt='' className="h-full w-full object-cover rounded" />
            </div>
          </div>
        </div>

        <div className="flex gap-x-4 mt-6">
          <button
            className="flex-1 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-lg font-semibold rounded-lg transition duration-200 text-white"
            onClick={acceptHandler}
          >
            Accept
          </button>
          <button
            className="flex-1 px-5 py-3 bg-red-600 hover:bg-red-500 text-lg font-semibold rounded-lg transition duration-200 text-white"
            onClick={rejectHandler}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
