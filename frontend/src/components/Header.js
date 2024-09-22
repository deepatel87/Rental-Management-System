import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch , useSelector} from "react-redux"
import { setHouseDetails } from "../redux/houseSlice";
import { setCurrTenant } from "../redux/requestSlice";

export default function Header({ userType }) {
  const dispatch = useDispatch()
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const user = useSelector((store)=>store.user.isAdmin)
  

  const navigateToHouseDetails = () => {
    dispatch(setHouseDetails(null))
    navigate("/housedetails/:add");
  };

  const [searchResult, setSearchResult] = useState([]);

  const userProfile =  useSelector((store)=>store.user.tenants);
  console.log(userProfile)
  

 

  const searchUser = (e) => {
    setSearch(e.target.value);
    
     


let ans = []

      userProfile.forEach(element => {
        if(element.user.fullName.trim().toLowerCase().includes(search.trim().toLowerCase())){
          ans.push(element)

        }
        
      });

      console.log(ans)
      setSearchResult(
          ans
       
  )
    // );
  };

  const goToUserProfile = (result) => {
    dispatch(setCurrTenant(result))

    navigate("/tenantprofile");
  };

  return (
    <nav className="w-full bg-gradient-to-bl from-[#3d5a80] to-[#98c1d9] shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        {!user  ? (
          <>
            <div>
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                <a href="">
                  <h2 className="text-2xl font-bold text-white">LOGO</h2>
                </a>
                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? "block" : "hidden"
                }`}
              >
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  <li className="text-white hover:text-indigo-200">
                    <a>Home</a>
                  </li>
                  <li className="text-white hover:text-indigo-200" onClick={()=>{navigate("pay-rent")}}>
                    Pay Rent
                  </li>
                  <li className="text-white hover:text-indigo-200">
                    <a>About Us</a>
                  </li>
                  <li className="text-white hover:text-indigo-200">
                    <a>Contact Us</a>
                  </li>
                </ul>

                <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                 
                  <button
                    className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden space-x-2 md:inline-block">
            <button
                    className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
            </div>
          </>
        ) : (
          <div className="flex p-3 gap-x-3">
            <div className="w-[600px] relative">
              <input
                type="text"
                placeholder="Search"
                className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-md"
                value={search}
                onChange={searchUser}
              />
              {search !== ""  &&  searchResult.length !== 0 ? (
                <div className="flex flex-col bg-white absolute border border-gray-300 rounded-md w-full mt-3 h-64 overflow-auto scrollbar-thin scrollbar-webkit">
                  {searchResult.map((result) => (
                    <div
                      key={result.id}
                      className="flex p-3 justify-start items-center gap-x-3 cursor-pointer"
                      onClick={() => goToUserProfile(result)}
                    >
                     
                      <p className="text-gray-900">{result.user.fullName}</p>
                    </div>
                  ))}
                </div>
              ) : (
                search !== "" && <p className=" p-3 bg-white absolute border border-gray-300 rounded-md w-full mt-3 ">No Results Found</p>
              )}
            </div>
            <button className="px-7 py-3 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 cursor-pointer">
              Search
            </button>
           {user && <> <Link
              to="/requests"
              className="px-7 py-3 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
            >
              requests
            </Link>
            <button
              className="px-7 py-3 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 cursor-pointer"
              onClick={navigateToHouseDetails}
            >
              Add Room
            </button>
            </>
} 
          </div>
        )}
      </div>
    </nav>
  );
}
