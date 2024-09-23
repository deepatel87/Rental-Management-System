import React, { useRef, useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SendRequest = () => {
  const inputRefs = useRef({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const houseData = useSelector((store) => store.house.houseDetails);
  const user = useSelector((store) => store.user.user);
  console.log(user)
  console.log(houseData._id)

  function checkParams() { 
    const values = {
      aadhaarNumber: inputRefs.current["aadhaar-number"]?.value,
      relativeNumber: inputRefs.current["relative-number"]?.value,
      relation: inputRefs.current["relation"]?.value,
      work: inputRefs.current["work"]?.value,
      occupation: inputRefs.current["occupation"]?.value,
      noOfPeople: inputRefs.current["no-of-people"]?.value,
      houseId: houseData?._id,
      userId: user?._id,
    }; 

    console.log(values)

    for (const key in values) {
      if (!values[key]) {
        setError("All fields are required");
        return null;
      }
    }

    return values;
  }

  async function submitHandler() {
    if (user?.roomDetails) {
      alert("You already have a room");
      return;
    }

    const data = checkParams();
    if (!data) return;

    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    const aadhaarFile = inputRefs.current["aadhaarImage"].files[0];

   
    if (aadhaarFile) {
      formData.append("aadhaarImage", aadhaarFile);
    } else {
      setError("Please upload your Aadhaar image");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/updateProfile", {
        method: "POST",
        body: formData,
      });

      const resp = await response.json();
      console.log(resp);
      if (resp.success) {
        navigate("/");
      } else {
        setError(resp.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#bfdbf7]">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-[#466b90] rounded-lg shadow-md mt-12">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <label htmlFor="aadhaar-number" className="block text-sm font-medium text-white">
              Aadhaar Number
            </label>
            <input
              id="aadhaar-number"
              name="aadhaar-number"
              type="text"
              placeholder="Enter your Aadhaar number"
              className="w-full px-3 py-2 mt-1 text-white outline-none bg-[#0f2740] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              ref={(el) => (inputRefs.current["aadhaar-number"] = el)}
            />
          </div>

          <div className="flex-1 min-w-[250px]">
            <label htmlFor="relative-number" className="block text-sm font-medium text-white">
              Relative No.
            </label>
            <input
              id="relative-number"
              name="relative-number"
              type="text"
              placeholder="Enter relative's number"
              className="w-full px-3 py-2 mt-1 text-white outline-none bg-[#0f2740] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              ref={(el) => (inputRefs.current["relative-number"] = el)}
            />
          </div>

          <div className="flex-1 min-w-[250px]">
            <label htmlFor="relation" className="block text-sm font-medium text-white">
              Relation
            </label>
            <input
              id="relation"
              name="relation"
              type="text"
              placeholder="Enter relation"
              className="w-full px-3 py-2 mt-1 text-white outline-none bg-[#0f2740] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              ref={(el) => (inputRefs.current["relation"] = el)}
            />
          </div>

          <div className="flex-1 min-w-[250px]">
            <label htmlFor="work" className="block text-sm font-medium text-white">
              Where do you work
            </label>
            <input
              id="work"
              name="work"
              type="text"
              placeholder="Enter place of work"
              className="w-full px-3 py-2 mt-1 text-white outline-none bg-[#0f2740] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              ref={(el) => (inputRefs.current["work"] = el)}
            />
          </div>

          <div className="flex-1 min-w-[250px]">
            <label htmlFor="occupation" className="block text-sm font-medium text-white">
              Occupation
            </label>
            <input
              id="occupation"
              name="occupation"
              type="text"
              placeholder="Enter occupation"
              className="w-full px-3 py-2 mt-1 text-white outline-none bg-[#0f2740] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              ref={(el) => (inputRefs.current["occupation"] = el)}
            />
          </div>

          <div className="flex-1 min-w-[250px]">
            <label htmlFor="no-of-people" className="block text-sm font-medium text-white">
              No of People
            </label>
            <input
              id="no-of-people"
              name="no-of-people"
              type="text"
              placeholder="Enter number of people"
              className="w-full px-3 py-2 mt-1 text-white outline-none bg-[#0f2740] border border-gray-500 rounded-md focus:ring focus:ring-indigo-400 focus:border-indigo-400"
              ref={(el) => (inputRefs.current["no-of-people"] = el)}
            />
          </div>
        </div>

        {/* File Upload Inputs */}
        <div className="flex flex-col space-[1rem] pb-4 mt-4">
         
          <p className="text-[1.1rem] text-white mt-8">Aadhar Card :</p>
          <div className="w-[5rem] h-[5rem] border-[#0f2740] border flex justify-center items-center mt-[0.5rem]">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white border-[#0f2740] border-2"
              htmlFor="img-upload-aadhaar"
            >
              <MdOutlineAddAPhoto fill="black" className="py-[0.6rem]" size={44} />
            </label>
            <input
              type="file"
              className="hidden"
              id="img-upload-aadhaar"
              ref={(el) => (inputRefs.current["aadhaarImage"] = el)}
            />
          </div>
        </div>

        <div>
          <button
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-[#0f2740] rounded-md hover:bg-[#1a3241] focus:ring focus:ring-indigo-400"
            onClick={submitHandler}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendRequest;