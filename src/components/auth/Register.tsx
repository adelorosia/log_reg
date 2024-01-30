import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../feature/store";
import {
  registerApiUser,
  setisLoginFormActive,
} from "../../feature/reducers/authSlice";
import { useFormik } from "formik";
import { NotificationService } from "../../feature/services/notificationServices";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoginFormActive } = useSelector((state: RootState) => state.auth);

  const formSchema = Yup.object({
    //firstName:Yup.string().required("richtig bitte").matches(/^regix kommet),
    firstName: Yup.string().required("richtig bitte"),
    lastName: Yup.string().required("richtig bitte"),
    email: Yup.string().required("richtig bitte"),
    password: Yup.string().required("richtig bitte"),
    gender: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "true",
    },
    onSubmit: async (values) => {
      try {
        const response = await dispatch(registerApiUser(values)).unwrap();
        NotificationService.success(response);
        setTimeout(() => {
          dispatch(setisLoginFormActive(true));
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
            ? "hidden"
            : "flex flex-col items-center gap-12 rounded-xl"
        }`}
      >
        <div
          className={`
            h-fit w-full sm:w-2/3  lg:w-[500px] px-8 py-16 flex flex-col rounded-3xl   transition-all duration-300 bg-STONE_300`}
        >
          <div className="w-full flex justify-center items-center gap-5 mb-8 cursor-pointer">
            <img className="w-16 h-16" src="./images/logo.png" alt="" />
            <h3 className=" font-ANTON text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
              Crypto Currency
            </h3>
          </div>
          <div className="flex items-center gap-5 mb-8 justify-between mr-5">
            <h4 className=" font-ANTON text-3xl">Register</h4>
            <FaArrowRightLong
              className="btn btn_rounded py-2 !bg-transparent"
              onClick={() => {
                dispatch(setisLoginFormActive(true));
              }}
            />
          </div>

          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <input
              className="input"
              placeholder="Firstname"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              className="input"
              placeholder="Lastname"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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

            <div className="flex justify-center items-center gap-6 text-lg ">
              <div className="flex gap-2">
                <label className="flex items-center gap-2" htmlFor="gender">
                  {" "}
                  <input
                    className="w-6 h-6"
                    id="man"
                    type="radio"
                    name="gender"
                    value="true"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === "true"}
                  />
                  Mann
                </label>
              </div>
              <div className="flex gap-2">
                <label htmlFor="frau" className="flex items-center gap-2">
                  {" "}
                  <input
                    className="w-6 h-6"
                    id="frau"
                    type="radio"
                    value="false"
                    name="gender"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === "false"}
                  />
                  Frau
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn py-3 !bg-BRAND_COLOR hover:!bg-transparent !rounded-lg"
            >
              Register
            </button>
          </form>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Register;
