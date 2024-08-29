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
      path: "/userprofile/:params",
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
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
