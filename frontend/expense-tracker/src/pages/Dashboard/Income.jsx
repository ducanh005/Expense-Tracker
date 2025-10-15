import { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import { data } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";

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
    const {source, amount, date, icon} = income

    if(!source.trim()){
      toast.error("Income source is required")
      return
    }
    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be a valid number greater than 0.")
      return
    }
    if(!date){
      toast.error("Date is required")
      return
    }
    try{
      await axiosInstance.post(
        `${API_PATHS.INCOME.ADD_INCOME}`,
        {source, amount, date, icon})
      setOpenAddIncomeModal(false)
      toast.success("Income added successfully")
      fetchIncomeDetails()
    }catch(error){
      console.error(
        "Error adding income",
        error.response?.data?.message || error.message
      )
    }
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
