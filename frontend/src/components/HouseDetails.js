import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addHouse } from "../redux/houseSlice";

const HouseDetails = () => {
  const houseData = useSelector((store) => store.house.houseDetails);
  const user = useSelector((store) => store.user.user);
  const isAdmin = useSelector((store) => store.user.isAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(houseData )
  console.log("---------------------")

  const { params } = useParams();
  let name = decodeURIComponent(params);
  name = name.substring(1);

  const [formValues, setFormValues] = useState({
    name: "",
    details: "",
    address: "",
    price: "",
    additionalDetails: "",
  });

  useEffect(() => {
    if (name === "edit" && houseData) {
      setFormValues({
        name: houseData.house_name || "",
        details: houseData.house_details || "",
        address: houseData.house_address || "",
        price: houseData.house_price || "",
        additionalDetails: houseData.additional_details || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,

    }));
  };

  const goToSendRequest = () => {
  //   const response = await fetch(
  //     "http://localhost:4000/api/v1/auth/sendOTP",
  //     {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ houseId:houseData._id , userId: user._id }),
  //     }
  //   );
  // };
  navigate("/sendrequest")
}

  console.log(formValues)

  async function edithandler() {
    const response = await fetch('http://localhost:4000/api/v1/room/addRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: formValues.name,
        details: formValues.details,
        address: formValues.address,
        rent: formValues.price,
        additionalDetails: formValues.additionalDetails,
      }),
    });

    const resp = await response.json();

    if (resp.success) {
      console.log("Room details updated successfully");
      dispatch(addHouse({
        type: formValues.name,
        details: formValues.details,
        address: formValues.address,
        rent: formValues.price,
        additionalDetails: formValues.additionalDetails,
      }));
      navigate("/");
    } else {
      console.log(resp);
    }
  }

  return (
    <div className="w-full min-h-screen">
      {!isAdmin ? (
        <div className="w-full min-h-screen flex flex-col bg-gray-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
            <div>
              <h1 className="text-4xl font-bold text-purple-700 mb-4">
                {houseData.type}
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                {houseData.details}
              </p>
              <p className="text-xl text-gray-700 mb-6">
                {houseData.additionalDetails}
              </p>
              <div className="bg-teal-200 p-4 rounded-lg mb-6">
                <span className="text-3xl font-bold text-teal-800">
                  ₹{houseData.rent}
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
  name="name"
  placeholder={houseData ? houseData.type : "Enter House Type"}
  value={formValues.name}
  onChange={handleChange}
  className="border border-gray-300 rounded w-full p-2 text-4xl font-bold text-purple-700 mb-4"
/>

<textarea
  name="details"
  placeholder={houseData ? houseData.details : "Enter House Details"}
  value={formValues.details}
  onChange={handleChange}
  className="border border-gray-300 rounded w-full p-2 text-xl text-gray-700 mb-6"
></textarea>

<input
  type="text"
  name="address"
  placeholder={houseData ? houseData.address : "Enter Address"}
  value={formValues.address}
  onChange={handleChange}
  className="border border-gray-300 rounded w-full p-2 text-xl text-gray-700 mb-6"
/>

<div className="bg-teal-200 p-4 rounded-lg mb-6">
  <input
    type="number"
    name="price"
    placeholder={houseData ? houseData.rent : "Enter Price"}
    value={formValues.price}
    onChange={handleChange}
    className="border-none bg-transparent text-3xl font-bold text-teal-800 w-full"
  />
  <span className="text-teal-700 ml-2 text-lg">per month</span>
</div>

<textarea
  name="additionalDetails"
  placeholder={houseData ? houseData.additionalDetails : "Enter Additional Details"}
  value={formValues.additionalDetails}
  onChange={handleChange}
  className="border border-gray-300 rounded w-full p-2 text-xl text-gray-700 mb-6"
></textarea>

          <button
            onClick={edithandler}
            className="bg-gradient-to-r from-purple-500 capitalize to-indigo-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full"
          >
            {name === "edit" ? "Update" : "Add House"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HouseDetails;
