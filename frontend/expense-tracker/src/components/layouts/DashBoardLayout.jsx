import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashBoardLayout = ({children,activeMenu}) => {
    const {user} = useContext(UserContext)
  return (
    <div className="">
        <Navbar activeMenu={activeMenu}/>

        {user && (
            <div className="flex">
                <div className="max-[100px]:hidden">
                    <SideMenu activeMenu={activeMenu}v/>
                </div>
                <div className="grow mx-5"></div>
            </div>
        )}
    </div>
  );
};

export default DashBoardLayout;