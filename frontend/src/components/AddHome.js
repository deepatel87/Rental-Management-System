import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addHouse } from '../redux/houseSlice';

const AddHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    details: '',
    address: '',
    price: '',
    additionalDetails: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    // Append all form fields to FormData
    Object.keys(formData).forEach(key => {
      if (key === 'image') {
        if (formData[key]) {
          formDataToSend.append('image', formData[key]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:4000/api/v1/room/addRoom', {
        method: 'POST',
        body: formDataToSend, // Send FormData instead of JSON
      });

      const resp = await response.json();

      if (resp.success) {
        console.log("Room details updated successfully");
        dispatch(addHouse(resp.data));
        navigate("/");
      } else {
        console.log(resp);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8 overflow-hidden">
        <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Add New Home</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Home Type
            </label>
            <input
              type="name"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
              Details
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (per month)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700">
              Additional Details
            </label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Home Image
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="image"
                className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Camera className="w-5 h-5 inline-block mr-2" />
                Choose file
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="sr-only"
                accept="image/*"
              />
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 h-32 w-auto rounded-md shadow-md" />
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Add Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHome;