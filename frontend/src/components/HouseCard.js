import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHouseDetails } from "../redux/houseSlice";

const HouseCard = ({ houseData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!houseData) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={houseData?.image}
          alt="House"
          className="w-full h-56 object-cover"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-bold text-purple-700 mb-2">
          {houseData?.type}
        </h2>
        <p className="text-gray-600 mb-4">{houseData?.address}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-extrabold text-purple-600">
            ₹{houseData?.rent}
          </span>
          <button
            className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={() => {
              dispatch(setHouseDetails(houseData));
              navigate("/housedetails/:edit");
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
