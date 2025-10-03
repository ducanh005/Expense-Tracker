import { useNavigate } from "react-router-dom";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";

import {LuHandCoins, LuWalletMinimal} from "react-icons/lu"
import {IoMdCard} from "react-icons/io"
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransaction from "../../components/Dashboard/RecentTransaction";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "./ExpenseTransactions";
import Last30DaysExpenses from "./Last30DaysExpenses";
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
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard/>}  
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance) || 0}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal/>}  
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome) || 0}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins/>}  
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense) || 0}
            color="bg-red-500"
          />

        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* <RecentTransaction
            transaction= {dashboardData?.recentTransactions}
            onSeeMore={()=> navigate("/expense")}
          />
          <FinanceOverview
            totalBalance = {dashboardData?.totalBalance || 0}
            totalIncome = {dashboardData?.totalIncome || 0}
            totalExpense = {dashboardData?.totalExpense || 0}
          /> */}
          <ExpenseTransactions
            transactions={dashboardData?.last30Daysexpense?.transactions || []}
            onSeeMore={()=> navigate("/expense")}
          ></ExpenseTransactions>

          <Last30DaysExpenses
            data={dashboardData?.last30Daysexpense?.transactions || []}
          />
        </div>
      </div>
    </DashBoardLayout>
    )
}

export default Home;