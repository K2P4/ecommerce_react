/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLogInMutation } from "../../store/services/endpoints/auth.endpoint";
import { Button } from "../../Components";
import { AllContext } from "../../context/AllContext";
import FormDataComponent from "../../Components/FormComponent/FormData.component";

const LoginPage = () => {
  const [loginFun, data] = useLogInMutation();
  const [errorMessage, setError] = useState("");
  const { registerCheck, setLogin, setRegister, logoutCheck, setLogout } =
    useContext(AllContext);

  const nav = useNavigate();

  useEffect(() => {
    let timer;
    let LogoutTimer;

    if (registerCheck) {
      timer = setTimeout(() => {
        setRegister(false);
      }, 3000);
    }

    if (logoutCheck) {
      LogoutTimer = setTimeout(() => {
        setLogout(false);
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (LogoutTimer) clearTimeout(LogoutTimer);
    };
  }, [registerCheck]);

  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("invalid email format"),
  });

  const handleSubmit = async (value) => {
    const response = await loginFun({ ...value, isAdmin: 1 });

    if (response?.data && response?.data.success) {
      localStorage.setItem("token", response.data.token);

      nav("/admin/dashboard");

      setLogin(true);
    } else {
      setError(response.error.data.message);
    }
  };

  return (
    <div className="">
      {registerCheck && (
        <p className="bg-gray-400 text-gray-50 text-sm px-2 py-1 float-end w-auto shadow-sm rounded-md mt-4">
          Register successfully!
        </p>
      )}

      {logoutCheck && (
        <p className="bg-gray-400 text-gray-50 text-sm px-2 py-1 float-end w-auto shadow-sm rounded-md mt-4">
          Logout successfully!
        </p>
      )}
      <div className="p-5 sm:p-0  flex flex-col justify-center  h-lvh   m-auto ">
        <p className="text-xl mx-auto text-center mb-2 w-full font-semibold">
          <span className="text-blue-600">X</span>PERFUMES
        </p>
       
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          initialValues={initialValue}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur, values }) => (
            <Form>
              <div className=" border p-4 sm:px-12 sm:py-8 rounded-xl bg-gray-50   sm:w-lg  m-auto  shadow-md">
                <h1 className="  text-xl font-medium  text-center m-auto mb-5">
                  Login Your Admin Account
                </h1>

                <FormDataComponent
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name={"email"}
                  type={"email"}
                  label={" Email "}
                  placeholder="xpos@gmail.com"
                />

                <ErrorMessage
                  component={"p"}
                  className=" text-xs text-red-400 mt-0"
                  name="email"
                />

                <FormDataComponent
                  name={"password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type={"password"}
                  label={" password "}
                />
                {errorMessage && (
                  <p className=" text-xs text-red-400 mt-0">{errorMessage}</p>
                )}

                <Button
                  disabled={isSubmitting}
                  type={"submit"}
                  name={"Login"}
                  label={"Login"}
                />

                <p
                  onClick={() => nav("/client/login")}
                  className=" select-none underline  text-left mt-2 text-blue-400 sm:text-sm  text-xs mb-2"
                >
                  Log in as Client?{" "}
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
