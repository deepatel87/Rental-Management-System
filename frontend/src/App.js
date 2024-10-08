import logo from "./logo.svg";
import Home from "./components/Home";
import "./index.css";
import Header from "./components/Header";
import HouseCard from "./components/HouseCard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import HouseDetails from "./components/HouseDetails";
import { RouterProvider } from "react-router";
import SendRequest from "./pages/SendRequest";
import UserProfile from "./components/UserProfile";
import Admin from "./components/Admin";
import Requests from './pages/Requests';
import TenantProfile from "./components/TenantProfile";
import Rent from "./components/Rent"
import AddHome from "./components/AddHome";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/housedetails/:params",
      element: <HouseDetails />,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/signup",
      element: <Signup></Signup>,
    },
    {
      path: "/sendrequest",
      element: <SendRequest></SendRequest>,
    },
    {
      path: "/profile",
      element: <UserProfile></UserProfile>,
    },
    {
      path: "/admin",
      element: <Admin></Admin>,
    },
    {
      path: "/requests",
      element: <Requests></Requests>,
    },

    {
      path: "/tenantprofile",
      element: <TenantProfile/>,
    },
    {
      path:"/pay-rent" ,
      element:<Rent></Rent>
    },
    {
      path:"/addroom" ,
      element:<AddHome></AddHome>
    }
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
