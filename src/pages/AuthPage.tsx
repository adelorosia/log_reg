import { useDispatch, useSelector } from "react-redux";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { AppDispatch, RootState } from "../feature/store";
import { setNotificationMessage, setisLoginFormActive } from "../feature/reducers/authSlice";
import { useEffect } from "react";

const AuthPage = () => {
const {isLoginFormActive,notificationMessage}=useSelector((state:RootState)=>state.auth)
const dispatch=useDispatch()



useEffect(()=>{
  dispatch(setisLoginFormActive(isLoginFormActive))
},[dispatch])

  return (
    <div className={``}>
      <div className="mt-32">
      <div className={``} >
        <Login />
      </div>
      <div className={``} >
        <Register />
      </div>
      </div>
    </div>
  );
};

export default AuthPage;
