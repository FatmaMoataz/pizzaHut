import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

export default function Contact() {
  const formFields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "text" },
    { name: "message", label: "Message", type: "textarea" },
  ];

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().matches(/^[0-9]+$/, "Only numbers allowed"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Submitted:", values);
    alert("Form submitted successfully!");
    resetForm();
  };

  return (
    <>
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold text-gray-900 sm:text-5xl">Contact</h2>
          <p className="mt-2 text-lg text-gray-600">We’d love to hear from you!</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 mt-10 items-center">
          <div className="w-full md:w-1/2 h-[300px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-lg"
              src="https://www.google.com/maps/embed?...your_link..."
              allowFullScreen
              rel="noopener noreferrer"
            ></iframe>
          </div>

          <div className="w-full md:w-1/2">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="w-full">
                  <div className="grid grid-cols-1 gap-6">
                    {formFields.map((field) => (
                      <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                        <div className="relative z-0 w-full mb-5 group">
                          <Field
                            as={field.type === "textarea" ? "textarea" : "input"}
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
                            placeholder=" "
                          />
                          <label
                            htmlFor={field.name}
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            {field.label}
                          </label>
                          <ErrorMessage name={field.name} component="p" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="block w-full rounded-md bg-[#ee3d40] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Let's talk"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
