import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import * as Yup from 'yup';

export default function Login() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [ApiError, setApiError] = useState(null);
  const { setUser } = useContext(tokenContext);

  let navigate = useNavigate();

  const user = {
    email: '',
    password: '',
  };

  async function callLogin(values) {
    try {
      setIsCallingApi(true);
      setApiError(null);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      localStorage.setItem("userToken", data.token);

      setUser({ token: data.token });

      setIsCallingApi(false);
      navigate('/menu');
    } catch (error) {
      setIsCallingApi(false);
      setApiError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
    }
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string()
      .matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'), 'Invalid password')
      .min(6, 'Minimum 6 characters')
      .required('Required'),
  });

  const LoginForm = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: callLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={LoginForm.handleSubmit} className="mx-auto my-10 w-[70%]">
        <h1 className="text-3xl my-7 text-main font-bold">Login</h1>

        {ApiError ? (
          <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="font-medium"> {ApiError}</span>
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="floating_email"
            onBlur={LoginForm.handleBlur}
            value={LoginForm.values.email}
            onChange={LoginForm.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        {LoginForm.errors.email && LoginForm.touched.email ? (
          <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="font-medium"> {LoginForm.errors.email}</span>
          </div>
        ) : null}

      
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="floating_password"
            onBlur={LoginForm.handleBlur}
            value={LoginForm.values.password}
            onChange={LoginForm.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {LoginForm.errors.password && LoginForm.touched.password ? (
          <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="font-medium"> {LoginForm.errors.password}</span>
          </div>
        ) : null}

       
        {isCallingApi ? (
          <div className="flex justify-center items-center bg-slate-50/35 absolute inset-0">
            <BounceLoader color="#ee3d40" />
          </div>
        ) : (
          <button
            type="submit"
            className="text-white bg-[#ee3d40] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm block ml-auto w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Login
          </button>
        )}
      </form>
    </>
  );
}