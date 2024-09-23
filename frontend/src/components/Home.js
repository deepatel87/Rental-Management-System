import { useSelector } from "react-redux";
import Header from "./Header";
import HouseCard from "./HouseCard";
import { useGetUser } from "../hooks/useGetUser";

const Home = () => {
  useGetUser()


  const userType = useSelector((store) => store.user?.user);

  let houseData = useSelector((store) => store.house?.houses);
  houseData = houseData.filter((house) => house?.isAvailable === "Available");

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <Header userType={userType} />
      <div className="w-11/12 mx-auto mt-10 pb-16">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-10 tracking-wide">
          Luxurious Homes for Rent
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {houseData.length !== 0 &&
            houseData.map((house, index) => (
              <HouseCard key={index} houseData={house} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
