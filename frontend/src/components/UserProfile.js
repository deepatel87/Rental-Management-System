import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../redux/requestSlice';

const UserProfile = () => {
  const dispatch = useDispatch()
  const { params } = useParams();
  const profile = decodeURIComponent(params);

  let person = useSelector((store) => store.request.currRequest);
  console.log(person)

  const id = person.id ;
  person=person.person

  const inputRefs = useRef({
    name: null,
    contactNo: null,
    email: null,
    aadharNo: null,
    address: null,
    relativeNo: null,
    relation: null,
    occupation: null,
    numberOfPeople: null,
  }); 

  async function updateProfile() {
    const formData = {
  
      aadharNo: inputRefs.current.aadharNo?.value,
      address: inputRefs.current.address?.value,
      relativeNo: inputRefs.current.relativeNo?.value,
      relation: inputRefs.current.relation?.value,
      occupation: inputRefs.current.occupation?.value,
      numberOfPeople: inputRefs.current.numberOfPeople?.value,
    };
    const response = await fetch('http://localhost:4000/api/v1/auth/updateProfile', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const resp = await response.json();
    console.log(resp)

    if (resp.success) {
      localStorage.setItem('db_token', resp.token);
      console.log('Profile updated successfully');
    } else {
      console.log(resp);
    }
  }

 async function acceptHandler() {

  const response = await fetch('http://localhost:4000/api/v1/auth/acceptRequest', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({requestId:id }),
  });

  const resp = await response.json();

    dispatch(removeRequest(id))


  }

  async function rejectHandler() {
    console.log(id)
    const response = await fetch('http://localhost:4000/api/v1/admin/rejectRequest', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({requestId:id }),
    });
  
    const resp = await response.json();
    console.log(resp)
  
      dispatch(removeRequest(id))


  }

  if (profile !== ':user' && profile !== ':admin') return <div>Page Not Found</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8 text-black">
    <h2 className="text-2xl font-bold mb-4">User Profile</h2>
  
    {/* User Details Section */}
    <div className="bg-gray-50 p-4 rounded-lg shadow mb-8">
      <h3 className="text-xl font-semibold mb-4">User Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">Name:</label>
          <input
            type="text"
            ref={(el) => (inputRefs.current.name = el)}
            className="border border-gray-300 rounded w-full p-2 placeholder-black"
            disabled
            placeholder={person?.fullName || 'Name'}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Contact No:</label>
          <input
            type="text"
            ref={(el) => (inputRefs.current.contactNo = el)}
            className="border border-gray-300 rounded w-full p-2 placeholder-black"
            disabled
            placeholder={person?.contactNumber || 'Contact No'}
          />
        </div>
        <div className="col-span-2">
          <label className="block font-semibold mb-2">Email:</label>
          <input
            type="email"
            ref={(el) => (inputRefs.current.email = el)}
            className="border border-gray-300 rounded w-full p-2 placeholder-black"
            disabled
            placeholder={person?.email || 'Email'}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Aadhar No:</label>
          <input
            type="text"
            ref={(el) => (inputRefs.current.aadharNo = el)}
            className="border border-gray-300 rounded w-full p-2 placeholder-black"
            disabled
            placeholder={person?.aadharNumber || 'Aadhar No'}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Relative No.:</label>
          <input
            type="text"
            ref={(el) => (inputRefs.current.relativeNo = el)}
            className="border border-gray-300 rounded w-full p-2 placeholder-black"
            disabled
            placeholder={person?.relativeNumber || 'Relative No.'}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Work.:</label>
          <input
            type="text"
            ref={(el) => (inputRefs.current.work = el)}
            className="border border-gray-300 rounded w-full p-2 placeholder-black"
            disabled
            placeholder={person?.work || 'Work'}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Relation:</label>
          <input
            type="text"
            ref={(el) => (inputRefs.current.relation = el)}
            className="border border-gray-300 rounded w-full p-2 placeholder-black"
            disabled
            placeholder={person?.relation || 'Relation'}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Occupation:</label>
          <input
            type="text"
            ref={(el) => (inputRefs.current.occupation = el)}
            className="border border-gray-300 rounded w-full p-2 placeholder-black"
            disabled
            placeholder={person?.occupation || 'Occupation'}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">No. of People:</label>
          <input
            type="number"
            ref={(el) => (inputRefs.current.numberOfPeople = el)}
            className="border border-gray-300 rounded w-full p-2 placeholder-black"
            disabled
            placeholder={person?.noOfPeople || 'No. of People'}
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <div className="w-24 h-24 border border-gray-300 rounded bg-gray-100 flex items-center justify-center">
            User Photo
          </div>
        </div>
      </div>
      
      <div className="flex gap-x-3">
        <button
          className="px-7 py-3 bg-blue-500 hover:bg-blue-400 text-lg font-semibold rounded-lg w-full mt-4 text-white"
          onClick={acceptHandler}
        >
          Accept
        </button>
        <button
          className="px-7 py-3 bg-blue-500 hover:bg-blue-400 text-lg font-semibold rounded-lg w-full mt-4 text-white"
          onClick={rejectHandler}
        >
          Reject
        </button>
      </div>
    </div>
  
    {/* Payment History Section */}
  </div>
  
  );
};

export default UserProfile;
