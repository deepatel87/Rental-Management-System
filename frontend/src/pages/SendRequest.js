import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const SendRequest = () => {
  const navigate = useNavigate();
  const houseData = useSelector((store) => store.house.houseDetails);
  const user = useSelector((store) => store.user.user);

  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    relativeNumber: "",
    relation: "",
    work: "",
    occupation: "",
    noOfPeople: "",
    aadhaarImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "aadhaarImage") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const checkParams = () => {
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === null) {
        setError(`Please fill in the ${key.replace(/([A-Z])/g, " $1").toLowerCase()} field.`);
        return false;
      }
    }
    setError("");
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!checkParams()) return;

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append("houseId", houseData._id);
    formDataToSend.append("userId", user._id);

    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/updateProfile", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Request sent successfully");
        navigate("/");
      } else {
        setError(data.message || "Failed to send request");
        toast.error(data.message || "Failed to send request");
      }
    } catch (error) {
      setError("An error occurred while sending the request");
      toast.error("Error Occured");
    }
  };

  if(!user){
    return <div>Nothing Here</div>
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8 overflow-hidden">
        <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Send Request</h1>
        
      

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700">
              Aadhaar Number
            </label>
            <input
              type="text"
              id="aadhaarNumber"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter your Aadhaar number"
              required
            />
          </div>

          <div>
            <label htmlFor="relativeNumber" className="block text-sm font-medium text-gray-700">
              Relative No.
            </label>
            <input
              type="text"
              id="relativeNumber"
              name="relativeNumber"
              value={formData.relativeNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter relative's number"
              required
            />
          </div>

          <div>
            <label htmlFor="relation" className="block text-sm font-medium text-gray-700">
              Relation
            </label>
            <input
              type="text"
              id="relation"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter relation"
              required
            />
          </div>

          <div>
            <label htmlFor="work" className="block text-sm font-medium text-gray-700">
              Where do you work
            </label>
            <input
              type="text"
              id="work"
              name="work"
              value={formData.work}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter place of work"
              required
            />
          </div>

          <div>
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter occupation"
              required
            />
          </div>

          <div>
            <label htmlFor="noOfPeople" className="block text-sm font-medium text-gray-700">
              No of People
            </label>
            <input
              type="number"
              id="noOfPeople"
              name="noOfPeople"
              value={formData.noOfPeople}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter number of people"
              required
            />
          </div>

          <div>
            <label htmlFor="aadhaarImage" className="block text-sm font-medium text-gray-700">
              Aadhaar Card Image
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="aadhaarImage"
                className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Camera className="w-5 h-5 inline-block mr-2" />
                Choose file
              </label>
              <input
                type="file"
                id="aadhaarImage"
                name="aadhaarImage"
                onChange={handleChange}
                className="sr-only"
                accept="image/*"
                required
              />
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="Aadhaar Card Preview" className="mt-4 h-32 w-auto rounded-md shadow-md" />
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendRequest;