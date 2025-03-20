import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { BounceLoader } from "react-spinners";
import * as Yup from "yup";
import { checkoutContext } from "../../context/checkoutContext";

export default function Checkout() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [ApiError, setApiError] = useState(null);
  const { cashOnDelivery, onlinePayment } = useContext(checkoutContext);
  const [isOnline, setIsOnline] = useState(false);

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  async function callPayment(values) {
    try {
      setIsCallingApi(true);

      if (isOnline) {
        let data = await onlinePayment(values);
        console.log("Online Payment Response:", data);
      } else {
        let data = await cashOnDelivery(values);
        console.log("Cash on Delivery Response:", data);
      }

      setApiError(null);
    } catch (error) {
      console.error("Error in checkout:", error);
      setApiError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsCallingApi(false);
    }
  }

  const validationSchema = Yup.object().shape({
    details: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });

  const shippingForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callPayment,
  });

  return (
    <form onSubmit={shippingForm.handleSubmit} className="mx-auto my-10 w-[70%]">
      <h1 className="text-3xl my-7 text-[#ee3d40] font-bold">Shipping Info</h1>

      {ApiError && (
        <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span className="font-medium"> {ApiError}</span>
        </div>
      )}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="details"
          id="floating_details"
          onBlur={shippingForm.handleBlur}
          value={shippingForm.values.details}
          onChange={shippingForm.handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_details"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Details
        </label>
      </div>

      {shippingForm.errors.details && shippingForm.touched.details && (
        <p className="text-red-500 text-sm">{shippingForm.errors.details}</p>
      )}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          name="phone"
          id="floating_phone"
          onBlur={shippingForm.handleBlur}
          value={shippingForm.values.phone}
          onChange={shippingForm.handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="city"
          id="floating_city"
          onBlur={shippingForm.handleBlur}
          value={shippingForm.values.city}
          onChange={shippingForm.handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_city"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          City
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="checkbox"
          onChange={() => setIsOnline(!isOnline)}
          className="accent-red-600"
        />
        <label className="mx-3 cursor-pointer">Online Payment</label>
      </div>

      {isCallingApi ? (
        <BounceLoader color="#ee3d40" />
      ) : (
        <button
          type="submit"
          className="text-white bg-[#ee3d40] hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Pay Now
        </button>
      )}
    </form>
  );
}