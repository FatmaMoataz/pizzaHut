import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import * as Yup from 'yup';

export default function Register() {
  
const [isCallingApi, setIsCallingApi] = useState(false)
const [ApiError, setApiError] = useState(null)

let navigate = useNavigate()

  const user = {
  name:'',
  email:"",
  password:"",
  rePassword:"",
  phone:""
}

async function callRegister(values) {
 try {
  setIsCallingApi(true)
  setApiError(null)
  let data=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)  
  console.log(data)
  setIsCallingApi(false)
  navigate('/login')
 }
catch(error) {
setApiError(error.response.data.message)
setIsCallingApi(false)
console.log(error);

}
}

const validationSchema = Yup.object().shape({
  name : Yup.string().min(3,"Minimum length should be 3").max(15,"Maximum length is 15").required("Required"),
  email : Yup.string().email('Invalid email format').required('Required'),
  password : Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'),'Invalid password').min(6,'Minimum 6 characters').required('Required'),
  rePassword : Yup.string().oneOf([Yup.ref('password')],'Confirmed password should match password').required('Required'),
  phone : Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'),'Invalid phone number').required('Required')
})

const registerForm = useFormik({
  initialValues : user,
  validationSchema : validationSchema,
  onSubmit : callRegister
})

  return (
    <>
    <Helmet>
    <title>Register</title>
  </Helmet> 
<form onSubmit={registerForm.handleSubmit} className=" mx-auto my-10 w-[70%]">
  <h1 className='text-3xl my-7 text-main font-bold'>Register Now</h1>
  
  {
ApiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i className="fa-solid fa-circle-exclamation"></i>
<span className="font-medium">  {ApiError}</span>
</div> : ''
}

  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="name" id="floating_name" onBlur={registerForm.handleBlur} value={registerForm.values.name} onChange={registerForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
  </div>
{
registerForm.errors.name && registerForm.touched.name ?   <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i className="fa-solid fa-circle-exclamation"></i>
<span className="font-medium">  {registerForm.errors.name}</span>
</div> : ''
}
  <div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email" id="floating_email" onBlur={registerForm.handleBlur} value={registerForm.values.email} onChange={registerForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
  </div>
  {
registerForm.errors.email && registerForm.touched.email ?   <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i className="fa-solid fa-circle-exclamation"></i>
<span className="font-medium">  {registerForm.errors.email}</span>
</div> : ''
}
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="password" id="floating_password" onBlur={registerForm.handleBlur} value={registerForm.values.password} onChange={registerForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {
registerForm.errors.password && registerForm.touched.password ?   <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i className="fa-solid fa-circle-exclamation"></i>
<span className="font-medium">  {registerForm.errors.password}</span>
</div> : ''
}
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="rePassword" id="floating_repassword" onBlur={registerForm.handleBlur} value={registerForm.values.rePassword} onChange={registerForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_repassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
  </div>
  {
registerForm.errors.rePassword && registerForm.touched.rePassword ?   <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i className="fa-solid fa-circle-exclamation"></i>
<span className="font-medium">  {registerForm.errors.rePassword}</span>
</div> : ''
}
  <div className="relative z-0 w-full mb-5 group">
    <input type="tel" name="phone" id="floating_phone" onBlur={registerForm.handleBlur} value={registerForm.values.phone} onChange={registerForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
  {
registerForm.errors.phone && registerForm.touched.phone ?   <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i className="fa-solid fa-circle-exclamation"></i>
<span className="font-medium">  {registerForm.errors.phone}</span>
</div> : ''
}

{
  isCallingApi ? <div className="flex justify-center items-center bg-slate-50/35 absolute inset-0">
  <BounceLoader color='#ee3d40' />
  </div> :   <button type="submit" className="text-white bg-[#ee3d40] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm block ml-auto w-full sm:w-auto  px-5 py-2.5 text-center">Register</button>

}

</form>
</>
  )
}
