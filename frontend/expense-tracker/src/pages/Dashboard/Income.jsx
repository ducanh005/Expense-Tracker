import { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import { data } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";

const Income = ()=>{
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState( {
    show: false,
    data: null
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  const fetchIncomeDetails = async()=>{
    if(loading) return;
    setLoading(true)
    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      )
      if(response.data){
        setIncomeData(response.data)
      }
    }catch(error){
      console.log("Something went wrong. PLS try again", error)
    }finally{
      setLoading(false)
    }

  }

  const handleAddIncome = async(income)=>{

  }

  const deleteIncome = async(id)=>{

  }

  const handleDownloadIncomeDetails = async()=>{

  }

  useEffect(()=>{
    fetchIncomeDetails()
    return()=>{}
  },[])
    return (
      <DashBoardLayout activeMenu= "Income" >
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="">
              <IncomeOverview
                transactions={incomeData}
                onAddIncome={()=> setOpenAddIncomeModal(true)}
              />
            </div>
          </div>

          <Modal
          isOpen={openAddIncomeModal}
          onClose={()=> setOpenAddIncomeModal(false)}
          title="Add Income"
          >
            <AddIncomeForm onAddIncome={handleAddIncome}/>
          </Modal>

        </div>
      </DashBoardLayout>
      
      )
}

export default Income;