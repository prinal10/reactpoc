import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

const validationSchema = Yup.object({
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
});

const MaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Email: "
          id="email"
          type="email"
          name="email"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          {...formik.getFieldProps("email")}
        />
        <TextField
          fullWidth
          label="FirstName: "
          id="firstName"
          type="firstName"
          name="firstName"
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          {...formik.getFieldProps("firstName")}
        />
        <TextField
          fullWidth
          label="LastName: "
          id="lastName"
          type="lastName"
          name="lastName"
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          {...formik.getFieldProps("lastName")}
        />
        <TextField
          fullWidth
          label="Password: "
          id="password"
          type="password"
          name="password"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          {...formik.getFieldProps("password")}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default MaterialUI;
