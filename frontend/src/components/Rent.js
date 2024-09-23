import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRentedRoom } from '../redux/houseSlice';

const Rent = () => {
    const rentedRoom = useSelector((store) => store.house?.rentedRoom);
    const dispatch = useDispatch();

    if (!rentedRoom) {
        return <div className="text-center text-lg text-gray-600">Its Empty here</div>;
    }

    const handlePayRent = async (rentId) => {
        const response = await fetch('http://localhost:4000/api/v1/room/payRent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rentHistoryId: rentId }),
        });

        const data = await response.json();
        dispatch(setRentedRoom(data.rentEntry));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-purple-700 text-center">Rent Details</h2>

            {rentedRoom.length > 0 ? (
                <div className="mt-4 space-y-4">
                    {rentedRoom.map((rentEntry) => (
                        rentEntry.status === 'Unpaid' && (
                            <div key={rentEntry._id} className="p-4 border border-gray-300 rounded-md bg-gray-50">
                                <p><strong>Rent Amount:</strong> {rentEntry.amount}</p>
                                <p><strong>For Month:</strong> {new Date(rentEntry.forMonth).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {rentEntry.status}</p>
                                <button 
                                    className="mt-2 px-4 py-2 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    onClick={() => handlePayRent(rentEntry._id)}>
                                    Pay Rent
                                </button>
                            </div>
                        )
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600">No Rent History Available</div>
            )}
        </div>
    );
};

export default Rent;
