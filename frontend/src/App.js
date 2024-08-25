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

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/housedetails",
      element: <HouseDetails />,
    },{
    path:"/login" , 
    element:<Login></Login>
    } ,
    {
      path:"/signup" ,
      element:<Signup></Signup>
    }
  ]);

  return (
   
    <RouterProvider router={appRouter} />
  );
}

export default App;
