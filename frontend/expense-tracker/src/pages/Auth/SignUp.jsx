import { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/layouts/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/layouts/Inputs/ProfilePhotoSelector";
const Signup = ()=>{
  const [profilePic,setProfilePic] = useState(null)
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const navigate = useNavigate();

  //handle Signup Form Submit
  const handleSignup = async (e)=>{

  }
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Tạo tài khoản</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Tham gia bằng cách nhập thông tin của bạn phía dưới</p>

        <form onSubmit={handleSignup}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(target) => setFullName(target.value)}
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
              type="text"
            />
            <Input
            value={email}
            onChange={(target) => setEmail(target.value)}
            label="Địa chỉ Email"
            placeholder="abc@gmail.com"
            type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={(target) => setPassword(target.value)}
                label="Mật khẩu"
                placeholder="Tối thiểu 8 kí tự"
                type="password"
              />

            </div>
           
          </div>
        </form>
      
      </div>
    </AuthLayout>
    )
}



export default Signup;