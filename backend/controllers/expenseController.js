const xlsx = require('xlsx')
const Expense = require("../models/Expense");


//add Expense user

exports.addExpense = async (req, res) => {
    
    const userId = req.user.id;
    try{
        const {icon, category, amount, date} = req.body;

        //Validation : check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({message:"Please fill all the fields"});
        }

        const newExpense = await Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })

        await newExpense.save();
        res.status(201).json(newExpense);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server error",error:error.message});
    }
}

//get all Expense of user
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        res.json(expense)
    }catch(error){ 
        res.status(500).json({message:"Server error",error:error.message});
    }
}

//delete Expense of user
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message:"Expense deleted successfully"})
    }catch (error){
        res.status(500).json({message:"server error"})
    }
}

//download Expense data in excel format
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id
    try{
        const expense = await Expense.find({userId}).sort({date:-1})

        const data = expense.map((item)=>({
            category: item.category,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "expense")
        xlsx.writeFile(wb,'expense.xlsx')
        res.download('expense.xlsx')
    }catch (error){
        console.log(error
        )
        res.status(500).json({message:"Server Error"})
    }
}