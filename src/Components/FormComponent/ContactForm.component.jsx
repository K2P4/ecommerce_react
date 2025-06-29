import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CheckCircle } from "lucide-react";
import FormDataComponent from "./FormData.component";
import { useSendMessageMutation } from "../../store/services/endpoints/contact.endpoint";

const ContactFormComponent = () => {
  const [sendForm] = useSendMessageMutation();
  const [success, setSuccess] = useState(false);

  const initialValue = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = yup.object({
    email: yup.string().required("email is required"),
    name: yup.string().required("name is required"),
    message: yup.string(),
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  const handleSubmit = async (value) => {
    const response = await sendForm(value);
    console.log("res", response);

    if (response.error) {
      alert.error(response.error.data.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
      {success ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-black mb-2">
            Message Sent!
          </h3>
          <p className="text-gray-600">
            Thank you for reaching out. We'll get back to you within 48 hours.
          </p>
        </div>
      ) : (
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          initialValues={initialValue}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur, values }) => (
            <Form className="  container mx-auto w-full">
              <Grid container className="   border-b-gray-300" spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormDataComponent
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    name={"name"}
                    type={"name"}
                    label={" Full Name "}
                  />

                  <ErrorMessage
                    component={"p"}
                    className=" text-xs text-red-400 mt-0"
                    name="name"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <FormDataComponent
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name={"email"}
                    type={"email"}
                    label={" Email "}
                    placeholder=""
                  />

                  <ErrorMessage
                    component={"p"}
                    className=" text-xs text-red-400 mt-0"
                    name="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <label className="text-sm text-gray-700 mb-1 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    placeholder="Tell us about your inquiry, product questions, or how we can help you..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    rows={5}
                  />
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </Grid>
              </Grid>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-gradient-to-r mt-2 from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <CircularProgress color="inherit" size="30px" />
                ) : (
                  "Send Message"
                )}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ContactFormComponent;
