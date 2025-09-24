import { useNavigate } from "react-router-dom";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Home = ()=>{
  useUserAuth()
  const navigate = useNavigate()
  const [dashboardData,setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const fetchDashboardData = async()=>{
    if(loading) return;
    setLoading(true)

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      )
      if(response.data){
        setDashboardData(response.data)
      }
    }catch(error){
        console.log("Something went wrong. PLS try again", error)
      }finally{
        setLoading(false)
      }
    
  }
  useEffect(()=>{
    fetchDashboardData()
    return()=>{}
  },[])
  return (
    <DashBoardLayout activeMenu= "Dashboard" >
      <div className="my-5 mx-auto">
        
      </div>
    </DashBoardLayout>
    )
}

export default Home;