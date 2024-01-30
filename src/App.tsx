import { NavLink, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./feature/store";
import {
  logoutApiUser,
  setFirstName,
  setLastName,
  setNotificationMessage,
  setPhoto,
  setToken,
  setisLoginFormActive,
} from "./feature/reducers/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { IJWTPAYLOAD } from "./feature/interface";
import { NotificationService } from "./feature/services/notificationServices";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, firstName, lastName, photo } =
    useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storeg = localStorage.getItem("token") || "";
    dispatch(setToken(storeg));
    if (token) {
      const decoded = jwtDecode<IJWTPAYLOAD>(token);
      dispatch(setFirstName(decoded.firstName));
      dispatch(setLastName(decoded.lastName));
      dispatch(setPhoto(decoded.photo));
    }
  }, [token]);
  return (
    <div className="container px-5 mt-5 ">
      <header className="flex gap-4 justify-center items-center text-xl">
        <NavLink to="/home">Home</NavLink>
        <NavLink
          className={`${token && "hidden"}`}
          to="/auth"
          onClick={() => dispatch(setisLoginFormActive(true))}
        >
          Login
        </NavLink>
        <div className={`${token ? "flex items-center gap-4" : "hidden"}`}>
          <img src={photo} width={46} height={46} alt="" />
          <h1>{firstName}</h1>
          <h1>{lastName}</h1>
          <button
            className={`px-5 py-2 bg-red-500 rounded-xl`}
            onClick={async () => {
              try {
                const response = await dispatch(logoutApiUser()).unwrap();
                NotificationService.success(response);
              } catch (error: any) {
                NotificationService.error(error.message);
              }
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};

export default App;
