import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHouseDetails } from "../redux/houseSlice";
const HouseCard = ({ houseData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={houseData.house_pic}
          alt={houseData.house_name}
          className="w-full h-56 object-cover"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-bold text-purple-700 mb-2">
          {houseData.house_name}
        </h2>
        <p className="text-gray-600 mb-4">{houseData.house_details}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-extrabold text-teal-600">
            ₹{houseData.house_price.toLocaleString()}
          </span>
          <button
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
