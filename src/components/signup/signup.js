import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './signup.css';
import { postUserApi } from '../../Api.js';

const UserSignup = () => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          postUserApi(values, callback);
          function callback(result) {
            if (!result || result == "Error") {
              alert(`Error: ${result}`);
              return;
            }
            window.location.assign(`${window.location.href}ProviderApplication`)
          }
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className='signup-form'>
        <label htmlFor='firstName'>First Name</label>
        <Field name='firstName' type='text' />
        <ErrorMessage name='firstName' />
        <label htmlFor='lastName'>Last Name</label>
        <Field name='lastName' type='text' />
        <ErrorMessage name='lastName' />
        <label htmlFor='email'>Email Address</label>
        <Field name='email' type='email' />
        <ErrorMessage name='email' />
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
};

export default UserSignup;
