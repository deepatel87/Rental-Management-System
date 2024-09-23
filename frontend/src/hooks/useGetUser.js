import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import { setHouses } from '../redux/houseSlice';
import { setUserType, addUser, setTenants } from '../redux/userSlice';
import { setRequests } from '../redux/requestSlice';
import { setRentedRoom } from '../redux/houseSlice';



export const useGetUser = ()=>{
    const user = useSelector((store)=>store.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    if(!localStorage.getItem('db_token')){
        navigate("/login")

    }






    async function getUSer(){

        try{
        const data  = await fetch('http://localhost:4000/api/v1/auth/getUser' , {
            method:'GET' ,
            headers:{
                'Content-type':'application/json' ,
                'Authorization':`Bearer ${localStorage.getItem('db_token')}`
            }
        })

        const resp = await data.json() ;
        console.log(resp)
        if(resp.success){
            dispatch(setHouses(resp.roomDetails));
            navigate('/');
            dispatch(setUserType(resp.user.isAdmin));
            dispatch(setRequests(resp.requests));
            dispatch(setTenants(resp.tenants));
            dispatch(setRentedRoom(resp.rentedRoom?.rentHistory));
      
            dispatch(addUser(resp.user));
            navigate("/")

        } else{
            console.log(resp)
            navigate("/login")
        }

    
} catch(err){
    console.log(err)
}
    }






    useEffect(()=>{
       !user &&  getUSer()

    } , [])
}