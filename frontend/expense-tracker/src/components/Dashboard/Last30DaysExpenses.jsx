import { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../../components/Charts/CustomBarChart";

const Last30DaysExpenses = ({data}) => {
    const [chartData, setChartData] = useState([])
    useEffect(()=>{
        const result  = prepareExpenseBarChartData(data)
        setChartData(result)
        console.log("Last 30 Days Expense Chart Data", result)
    },[data])
    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart data={chartData} xKey="category"/>
        </div>
    );
};

export default Last30DaysExpenses;