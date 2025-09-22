import { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/layouts/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/layouts/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
const Signup = ()=>{
  const [profilePic,setProfilePic] = useState(null)
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  //handle Signup Form Submit
  const handleSignup = async (e)=>{
    e.preventDefault()

    let profileImageUrl = "";

    if(!fullName){
      setError("Vui lòng nhập họ và tên.")
      return;
    }

    if(!validateEmail(email)){
      setError("Vui lòng nhập email hợp lệ.")
      return;
    }
    if(!password){
      setError("Vui lòng nhập mật khẩu")
      return; 
    }

    setError("")
    //Signup API Call

    try{

      //Upload img if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      })
      const {token,user} = response.data;
      if(token){
        localStorage.setItem("token",token)
        updateUser(user)
        navigate("/dashboard")
      }
    }catch (error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("Something went wrong. pls try again")
      }
    }
    

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
              onChange={(e) => setFullName(e.target.value)}
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
              type="text"
            />
            <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Địa chỉ Email"
            placeholder="abc@gmail.com"
            type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Mật khẩu"
                placeholder="Tối thiểu 8 kí tự"
                type="password"
              />

            </div>
          </div>

           {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button type="submit" className="btn-primary">
              SIGN UP
            </button>
            <p className="text-[13px] text-slate-800 mt-3">
              Bạn đã có tài khoản?{' '}
              <Link className="font-medium text-primary underline" to="/login">
                Đăng nhập
              </Link>
            </p>
        </form>
      
      </div>
    </AuthLayout>
    )
}



export default Signup;