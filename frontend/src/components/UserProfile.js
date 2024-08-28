import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { params } = useParams();
  const profile = decodeURIComponent(params);

  if (profile !== ":user" && profile !== ":admin")
    return <div>Page Not Found</div>;
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {/* User Details Section */}
      <div className="bg-gray-50 p-4 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">User Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">Name:</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Contact No:</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Contact No"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-semibold mb-2">Email:</label>
            <input
              type="email"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Aadhar No:</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Aadhar No"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-semibold mb-2">Address:</label>
            <textarea
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Address"
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold mb-2">Relative No.:</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Relative No."
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Relation:</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Relation"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Occupation:</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Occupation"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">No. of People:</label>
            <input
              type="number"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="No. of People"
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <div className="w-24 h-24 border border-gray-300 rounded bg-gray-100 flex items-center justify-center">
              User Photo
            </div>
          </div>
        </div>
        {profile === ":user" ? (
          <button className="px-7 py-3 bg-blue-500 hover:bg-blue-400 text-lg font-semibold rounded-lg w-full mt-4 text-white">
            Save
          </button>
        ) : (
          profile === ":admin" && (
            <div className="flex gap-x-3">
              <button className="px-7 py-3 bg-blue-500 hover:bg-blue-400 text-lg font-semibold rounded-lg w-full mt-4 text-white">
                Accept
              </button>
              <button className="px-7 py-3 bg-blue-500 hover:bg-blue-400 text-lg font-semibold rounded-lg w-full mt-4 text-white">
                Reject
              </button>
            </div>
          )
        )}
      </div>

      {/* Payment History Section */}
      {profile === ":user" && (
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Payment History</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-2">Date</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">16/07/24</td>
                <td className="border p-2">58014</td>
                <td className="border p-2 text-green-500">Paid</td>
              </tr>
              <tr>
                <td className="border p-2">16/08/24</td>
                <td className="border p-2">14000</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white rounded px-4 py-2">
                    Pay Now
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
