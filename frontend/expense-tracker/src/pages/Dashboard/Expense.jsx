import { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
const Expense = ()=>{
    useUserAuth()
    const [expenseData, setExpenseData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState( {
      show: false,
      data: null
    })
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  
    const fetchExpenseDetails = async()=>{
      if(loading) return;
      setLoading(true)
      try{
        const response = await axiosInstance.get(
          `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
        )
        if(response.data){
          setExpenseData(response.data)
        }
      }catch(error){
        console.log("Something went wrong. PLS try again", error)
      }finally{
        setLoading(false)
      }

    }

    const handleAddExpense = async(income)=>{
      const {category, amount, date, icon} = income

      if(!category.trim()){
        toast.error("Category source is required")
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
          `${API_PATHS.EXPENSE.ADD_EXPENSE}`,
          {category, amount, date, icon})
        setOpenAddExpenseModal(false)
        toast.success("Income added successfully")
        fetchExpenseDetails()
      }catch(error){
        console.error(
          "Error adding income",
          error.response?.data?.message || error.message
        )
      }
    }
  

    const deleteExpense = async(id)=>{
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({show:false, data:null})
      toast.success("Expense deleted successfully")
      fetchExpenseDetails()
    }catch(error){
      console.error(
        "Error deleting expense",
        error.response?.data?.message || error.message
      )
    }
  }
  const handleDownloadExpenseDetails = async()=>{

  }
  useEffect(()=>{
      fetchExpenseDetails()
      return()=>{}
  },[])

    return (
      <DashBoardLayout activeMenu= "Expense" >
          <div className="my-5 mx-auto">
            <div className="">
              <div className="">
                <ExpenseOverview
                  transactions= {expenseData}
                  onExpenseIncome={()=>setOpenAddExpenseModal(true)}
                />
              </div>

              <ExpenseList
                transactions={expenseData}
                onDelete={(id)=>setOpenDeleteAlert({show:true, data:id})}
                onDownload={handleDownloadExpenseDetails}
              />
            </div>
            <Modal
              isOpen={openAddExpenseModal}
              onClose={()=>setOpenAddExpenseModal(false)}
              title="Add Expense"
            >
              <AddExpenseForm onAddExpense={handleAddExpense}/>
            </Modal>

            <Modal
            isOpen={openDeleteAlert.show}
            onClose={()=>setOpenDeleteAlert({show:false, data:null})}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense?"
              onDelete={()=>deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
          </div>
      </DashBoardLayout>
      )
}

export default Expense;