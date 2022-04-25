import React from "react";
import { useFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Checkbox } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const validationSchema = Yup.object().shape({
  acceptTerms: Yup.bool().oneOf([true], "Accept terms and conditions."),
});

const resetError = (setError) => {
  setTimeout(() => setError({}), 3000);
};

const CheckBox = (props) => {
  const { setErrors } = props;
  const formik = useFormik({
    initialValues: {
      acceptTerms: false,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      //alert(JSON.stringify(values, null, 2));
      console.log(resetForm);
      console.log(JSON.stringify(values, null, 2));
      resetForm({});
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="acceptTerms">Do you Accept:</label>
        <Checkbox {...formik.getFieldProps("acceptTerms")} />
        {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
          <p
            style={{
              background: "pink",
              fontSize: "20px",
              color: "red",
              width: "15%",
              padding: 10,
            }}
          >
            {formik.errors.acceptTerms}
            <ErrorIcon color="secondary" fontSize="large" />
          </p>
        ) : null}
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CheckBox;
