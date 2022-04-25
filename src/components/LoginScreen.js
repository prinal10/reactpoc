import React from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

//TODO: initial values, submit,  validate schema, 2fields (use, pass) button, checkbox (T&C)

const initialValues = {
    username: "",
    password: "",
    termsAndCondition: "",
};


const validateSchema = Yup.object({
    username: Yup.string().required("username is required!"),
    password: Yup.string()
        .required("password is required!")
        .min(8, "password needs to be atleast 8 char long!")
        .matches(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
            "didnt meet password complexity!"
        ),
    termsAndCondition: Yup.string().required("need to agree t&C!"),
});

const alertStyles = (prop) => {
    return (
        <div className="alert-danger p-2 w-50" role="alert">
            <ErrorMessage name={prop.name}/>
        </div>
    );
};

const LoginScreen = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (values, submitProps) => {
        try {
            await login(values.username, values.password);
            console.log(login);
            navigate("/admin", {replace: true});
            submitProps.resetForm();
            console.log(navigate);
            //handle form submit here
        } catch (e) {
            //handle error
            alert(`Authentication failed: ${e}`);
        }
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validateSchema}
            >
                <Form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <Field
                            className="form-control"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="username here"
                        />
                        <ErrorMessage
                            name="username"
                            component={() => alertStyles({name: "username"})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Password
                        </label>
                        <Field
                            className="form-control"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password here"
                        />
                        <ErrorMessage
                            name="password"
                            component={() => alertStyles({name: "password"})}
                        />
                    </div>
                    <button className="btn btn-primary btn-large" type="submit">
                        Submit
                    </button>
                    <br/>
                    <label htmlFor="termsAndCondition" className="form-label mt-2">
                        <Field
                            className="form-check-input"
                            type="checkbox"
                            id="termsAndCondition"
                            name="termsAndCondition"
                        />
                        <span className="mx-2">Accept Terms & Condition</span>
                    </label>
                    <ErrorMessage
                        name="termsAndCondition"
                        component={() => alertStyles({name: "termsAndCondition"})}
                    />
                </Form>
            </Formik>
        </>
    );
};

export default LoginScreen;
