import React, { useState, useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const codeValidationSchema = Yup.object().shape({
    resetCode: Yup.string().required("Required"),
  });

  const passwordValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
    newPassword: Yup.string()
      .matches(new RegExp("^[A-Z][a-z0-9]{3,8}$"), "Invalid password")
      .min(6, "Minimum 6 characters")
      .required("Required"),
  });

  const emailForm = useFormik({
    initialValues: { email: "" },
    validationSchema: emailValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsCallingApi(true);
        setApiError(null);
        await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
          values
        );
        setIsCallingApi(false);
        setStep(2);
      } catch (error) {
        setApiError(error.response?.data?.message || "Something went wrong");
        setIsCallingApi(false);
      }
    },
  });

  const codeForm = useFormik({
    initialValues: { resetCode: "" },
    validationSchema: codeValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsCallingApi(true);
        setApiError(null);
        await axios.post(
          `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
          values
        );
        setIsCallingApi(false);
        setStep(3);
      } catch (error) {
        setApiError(error.response?.data?.message || "Something went wrong");
        setIsCallingApi(false);
      }
    },
  });

  const passwordForm = useFormik({
    initialValues: { email: "", newPassword: "" },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsCallingApi(true);
        setApiError(null);
        const { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
          values
        );
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        setIsCallingApi(false);
        navigate("/home");
      } catch (error) {
        setApiError(error.response?.data?.message || "Something went wrong");
        setIsCallingApi(false);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="mx-auto my-10 w-[70%]">
        {step === 1 && (
          <form onSubmit={emailForm.handleSubmit}>
            <h1 className="text-3xl my-7 font-bold">
              Please Enter Your Verification Email
            </h1>
            {apiError && (
              <div
                className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <i className="fa-solid fa-circle-exclamation"></i>
                <span className="font-medium"> {apiError}</span>
              </div>
            )}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="floating_email"
                onBlur={emailForm.handleBlur}
                value={emailForm.values.email}
                onChange={emailForm.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            {emailForm.errors.email && emailForm.touched.email && (
              <div
                className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <i className="fa-solid fa-circle-exclamation"></i>
                <span className="font-medium"> {emailForm.errors.email}</span>
              </div>
            )}
            <button
              type="submit"
              className="text-white bg-[#ee3d40] hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm block ml-auto w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isCallingApi ? "Sending..." : "Send Code"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={codeForm.handleSubmit}>
            <h1 className="text-3xl my-7 font-bold">Verification Code</h1>
            {apiError && (
              <div
                className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <i className="fa-solid fa-circle-exclamation"></i>
                <span className="font-medium"> {apiError}</span>
              </div>
            )}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="resetCode"
                id="floating_code"
                onBlur={codeForm.handleBlur}
                value={codeForm.values.resetCode}
                onChange={codeForm.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_code"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Code
              </label>
            </div>
            {codeForm.errors.resetCode && codeForm.touched.resetCode && (
              <div
                className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <i className="fa-solid fa-circle-exclamation"></i>
                <span className="font-medium">
                  {" "}
                  {codeForm.errors.resetCode}
                </span>
              </div>
            )}
            <button
              type="submit"
              className="text-white bg-[#ee3d40] hover:bg-red-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm block ml-auto w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isCallingApi ? "Verifying..." : "Verify"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={passwordForm.handleSubmit}>
            <h1 className="text-3xl my-7 text- font-bold">
              Reset Your Account Password
            </h1>
            {apiError && (
              <div
                className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <i className="fa-solid fa-circle-exclamation"></i>
                <span className="font-medium"> {apiError}</span>
              </div>
            )}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="floating_email"
                onBlur={passwordForm.handleBlur}
                value={passwordForm.values.email}
                onChange={passwordForm.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            {passwordForm.errors.email && passwordForm.touched.email && (
              <div
                className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <i className="fa-solid fa-circle-exclamation"></i>
                <span className="font-medium">
                  {" "}
                  {passwordForm.errors.email}
                </span>
              </div>
            )}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="newPassword"
                id="floating_password"
                onBlur={passwordForm.handleBlur}
                value={passwordForm.values.newPassword}
                onChange={passwordForm.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            {passwordForm.errors.newPassword &&
              passwordForm.touched.newPassword && (
                <div
                  className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="font-medium">
                    {" "}
                    {passwordForm.errors.newPassword}
                  </span>
                </div>
              )}
            {isCallingApi ? (
              <div className="flex justify-center items-center bg-slate-50/35 absolute inset-0">
                <BounceLoader color="#ee3d40" />
              </div>
            ) : (
              <div className="flex justify-around items-center">
                <button
                  type="submit"
                  className="text-white bg-[#ee3d40] hover:bg-red-800  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm block ml-auto w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Reset Password
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </>
  );
}
