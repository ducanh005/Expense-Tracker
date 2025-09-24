import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";

const Home = ()=>{
  useUserAuth()
  return (
    <DashBoardLayout activeMenu= "Dashboard" >
      <div className="my-5 mx-auto"></div>
    </DashBoardLayout>
    )
}

export default Home;