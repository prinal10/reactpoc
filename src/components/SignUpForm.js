import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// const validate = (values) => {
//     const error = {};
//     if (!values.firstName) {
//         error.firstName = "firstname is required!";
//     } else if (values.firstName.length > 10) {
//         error.firstName = "firstname cannot exceed 10 characters";
//     }
//
//     if (!values.lastName) {
//         error.lastName = "lastName is required!";
//     } else if (values.lastName.length > 10) {
//         error.lastName = "lastName cannot exceed 10 characters";
//     }
//
//     if (!values.email) {
//         error.email = "email is required!";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         error.email = "email cannot exceed 10 characters";
//     }
//
//     return error;
// }

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(10, "firstname cannot exceed 10 characters")
        .required("firstname is required!"),
      lastName: Yup.string()
        .max(10, "lastName cannot exceed 10 characters")
        .required("lastName is required!"),
      email: Yup.string()
        .email("Not a valid email!")
        .required("Email is required!"),
      password: Yup.string()
        .matches(
          "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .required("password is required!"),
    }),
    onSubmit: (values) => {
      console.log("testing: " + JSON.stringify(values, null, 2));
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          {...formik.getFieldProps("email")}
        />
        {formik.errors.email && formik.touched.email ? (
          <p>{formik.errors.email}</p>
        ) : null}
        <label htmlFor="firstName">FirstName: </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          {...formik.getFieldProps("firstName")}
        />
        {formik.errors.firstName && formik.touched.firstName ? (
          <p>{formik.errors.firstName}</p>
        ) : null}
        <label htmlFor="lastName">LastName: </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          {...formik.getFieldProps("lastName")}
        />
        {formik.errors.lastName && formik.touched.lastName ? (
          <p>{formik.errors.lastName}</p>
        ) : null}
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          {...formik.getFieldProps("password")}
        />
        {formik.errors.password && formik.touched.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUpForm;
