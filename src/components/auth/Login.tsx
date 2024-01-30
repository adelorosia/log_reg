import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../feature/store";
import {
  loginApiUser,
  setNotificationMessage,
  setisLoginFormActive,
} from "../../feature/reducers/authSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import { NotificationService } from "../../feature/services/notificationServices";
import { useEffect } from "react";
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoginFormActive, notificationMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setNotificationMessage(notificationMessage));
    }, 1000);
  }, [setNotificationMessage, notificationMessage]);
  const formSchema = Yup.object({
    //firstName:Yup.string().required("richtig bitte").matches(/^regix kommet),

    email: Yup.string().required("richtig bitte"),
    password: Yup.string().required("richtig bitte"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await dispatch(loginApiUser(values)).unwrap()
        NotificationService.success("login Success");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error: any) {
        NotificationService.error(error.message);
      }
    },
    validationSchema: formSchema,
  });

  return (
    <>
      <div
        className={`${
          isLoginFormActive
            ? "flex flex-col items-center gap-12 rounded-xl"
            : "hidden"
        }`}
      >
        <div
          className={` h-fit w-full sm:w-2/3  lg:w-[500px] px-8 py-16 flex flex-col rounded-3xl bg-STONE_300`}
        >
          <div className="w-full flex justify-center items-center gap-5 mb-8 cursor-pointer">
            <img className="w-16 h-16" src="./images/logo.png" alt="" />
            <h3 className=" font-ANTON text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
              Crypto Currency
            </h3>
          </div>
          <div className="flex items-center gap-5 mb-8 justify-start mr-5">
            <h4 className="">If you have an account, please log in.</h4>
          </div>

          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <input
              className="input"
              placeholder="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              className="input"
              placeholder="password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="submit"
              className="btn py-3 !bg-BRAND_COLOR hover:!bg-transparent !rounded-lg"
            >
              Login
            </button>
          </form>
          <div className="my-12 flex w-full items-center gap-3">
            <div className="w-full border"></div>
            <h2 className="text-center w-fit">Or</h2>
            <div className="w-full border"></div>
          </div>
          <button
            className="btn py-3 !bg-BRAND_COLOR hover:!bg-transparent !rounded-lg"
            onClick={() => {
              dispatch(setisLoginFormActive(false));
            }}
          >
            Register
          </button>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Login;
