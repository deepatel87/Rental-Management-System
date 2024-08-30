import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../redux/requestSlice';
import { removeTenant } from '../redux/userSlice';
import { addHouse } from '../redux/houseSlice';

const TenantProfile = () => {
  const dispatch = useDispatch()
  const { params } = useParams();

  let person = useSelector((store) => store.request.currTenant.user);
  let house = useSelector((store) => store.request.currTenant.room);
  let id = useSelector((store) => store.request.currTenant._id);


 

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
    console.log(id)
    const response = await fetch('http://localhost:4000/api/v1/admin/removeTenant', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({tenantId:id }),
    });
  
    const resp = await response.json();
    console.log(resp)
    console.log(id)

    dispatch(removeTenant(id))
    console.log(house)
    const newObj = { 
        ...house, 
        isAvailable: "Available" 
      };
      
      dispatch(addHouse(newObj));
      
  


  }

  return (
    <div>

        <button onClick={removetenant}>Remove Tenant</button>
        <p>{person.fullName}</p>
        <p>{person.rent}</p>
        <p>{person.aadharNumber}</p>
        <p>{person.numberOfPeople}</p>
        <p>{person.occupation}</p>
    </div>

 
  
       

      
  
  
  );
};

export default TenantProfile;
