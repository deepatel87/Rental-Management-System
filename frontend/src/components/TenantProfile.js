import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../redux/requestSlice';
import { removeTenant } from '../redux/userSlice';
import { addHouse } from '../redux/houseSlice';

const TenantProfile = () => {
  const dispatch = useDispatch();
  const { params } = useParams();

  const person = useSelector((store) => store.request.currTenant.user);
  const house = useSelector((store) => store.request.currTenant.room);
  const id = useSelector((store) => store.request.currTenant._id);
  const rentHistory = useSelector((store) => store.request.currTenant.rentHistory) || [];

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

  async function removetenant() {
    console.log(id);
    const response = await fetch('http://localhost:4000/api/v1/admin/removeTenant', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tenantId: id }),
    });

    const resp = await response.json();
    console.log(resp);

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
    <div>
      <button onClick={removetenant}>Remove Tenant</button>
      <p>{person.fullName}</p>
      <p>{person.rent}</p>
      <p>{person.aadharNumber}</p>
      <p>{person.numberOfPeople}</p>
      <p>{person.occupation}</p>

      <h3>Unpaid Rents</h3>
      {unpaidRents.length > 0 ? (
        <ul>
          {unpaidRents.map((rent) => (
            <li key={rent._id}>
              <p>Amount: {rent.amount}</p>
              <p>For Month: {new Date(rent.forMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
              <p>Date of Payment: {rent.dateOfPayment ? new Date(rent.dateOfPayment).toLocaleDateString() : 'Not paid yet'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No unpaid rents.</p>
      )}
    </div>
  );
};

export default TenantProfile;
