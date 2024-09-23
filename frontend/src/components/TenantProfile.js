import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeTenant } from '../redux/userSlice';
import { addHouse } from '../redux/houseSlice';

const TenantProfile = () => {
  const dispatch = useDispatch();
  const { params } = useParams();

  const person = useSelector((store) => store.request.currTenant.user);
  const house = useSelector((store) => store.request.currTenant.room);
  const id = useSelector((store) => store.request.currTenant._id);
  const rentHistory = useSelector((store) => store.request.currTenant.rentHistory) || [];

  async function removetenant() {
    const response = await fetch('http://localhost:4000/api/v1/admin/removeTenant', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tenantId: id }),
    });

    const resp = await response.json();
    dispatch(removeTenant(id));
    const newObj = { 
      ...house, 
      isAvailable: "Available" 
    };
      
    dispatch(addHouse(newObj));
  }

  // Filter unpaid rents
  const unpaidRents = rentHistory.filter(rent => rent.status === 'Unpaid');

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-purple-600 p-5">
      <div className="bg-white rounded-lg shadow-md p-6 mb-5">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">{person.fullName}'s Profile</h1>
        <button 
          onClick={removetenant}
          className="mb-4 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-900 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Remove Tenant
        </button>
        <h2 className="text-2xl font-semibold text-purple-600">Details</h2>
        <p className="text-gray-800">Rent: ₹{house.rent}</p>
        <p className="text-gray-800">Aadhar Number: {person.aadharNumber}</p>
        <p className="text-gray-800">Number of People: {person.noOfPeople}</p>
        <p className="text-gray-800">Occupation: {person.occupation}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-5">
        <h3 className="text-xl font-semibold text-purple-600">Unpaid Rents</h3>
        {unpaidRents.length > 0 ? (
          <ul className="mt-2">
            {unpaidRents.map((rent) => (
              <li key={rent._id} className="bg-gray-100 rounded-md shadow p-4 mb-2">
                <p className="text-gray-800">Amount: ₹{rent.amount}</p>
                <p className="text-gray-600">For Month: {new Date(rent.forMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                <p className="text-gray-600">Date of Payment: {rent.dateOfPayment ? new Date(rent.dateOfPayment).toLocaleDateString() : 'Not paid yet'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No unpaid rents.</p>
        )}
      </div>
    </div>
  );
};

export default TenantProfile;
