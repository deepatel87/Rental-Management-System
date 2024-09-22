import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRentedRoom } from '../redux/houseSlice';

const Rent = () => {
    const rentedRoom = useSelector((store) => store.house?.rentedRoom);
    console.log(rentedRoom)
    const dispatch = useDispatch()

    if (!rentedRoom) {
        return <div>You Haven't Rented Any Room</div>;
    }

    const handlePayRent = async(rentId) => {

        const response = await fetch('http://localhost:4000/api/v1/room/payRent', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              
            }, 
            body: JSON.stringify({rentHistoryId:rentId})
          });

          const data = await response.json()
          console.log(data)
          dispatch(setRentedRoom(data.rentEntry))
    };

    return (
        <div className="rented-room-container">
            <h2>Rent Details</h2>

            {rentedRoom?.length > 0 ? (
                <div className="rent-history-list">
                    {rentedRoom.map((rentEntry) => (
                        rentEntry.status === 'Unpaid' && (
                            <div key={rentEntry._id} className="rent-entry">
                                <p><strong>Rent Amount:</strong> {rentEntry.amount}</p>
                                <p><strong>For Month:</strong> {new Date(rentEntry.forMonth).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {rentEntry.status}</p>
                                <button 
                                    className="pay-rent-button" 
                                    onClick={() => handlePayRent(rentEntry._id)}>
                                    Pay Rent
                                </button>
                            </div>
                        )
                    ))}
                </div>
            ) : (
                <div>No Rent History Available</div>
            )}
        </div>
    );
};

export default Rent;
