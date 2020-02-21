import React, { useState, Fragment } from "react";
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./questionaire.css";
import setQuestions from "../../actions/setQuestions";

const Questionaire = ({ questions }) => {
  const [questionsList, setQuestionsList] = useState(null);

  function questionsResponse(result) {
    if (!result || result == "Error") {
      alert("Error getting questions");
      return;
    }
    const topTierQuestions =
      result && result.filter(question => question.parent == null);

    setQuestionsList(result);

    setQuestions(result);
    return result;
  }

  const isLoading = !questionsList;
  isLoading && questions(questionsResponse);
  return (
    !isLoading && (
      <Formik
        initialValues={{ questions: questionsList }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required")
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
        render={({ values }) => (
          <Form>
            <FieldArray
              name="questions"
              render={arrayHelpers => (
                <div className="questionaire">
                  {values.questions && values.questions.length > 0
                    ? values.questions.map((question, index) => {
                        const isBool =
                            question && question.questionType == "bool",
                          isNum = question && question.questionType == "num",
                          isText = question && question.questionType == "text",
                          isInput = question && !isBool && !isNum && !isText;
                        const inputFieldsStr = isInput && question.questionType;

                        const inputFields =
                          inputFieldsStr && inputFieldsStr.split(",");

                        const isTopLevel = question.isParent && !question.parent;

                        const hasChild = question.isParent;
                        const children =
                          hasChild &&
                          questions.filter(
                            child => child.parent == question.Id
                          );

                        return (
                          <div>
                            {isTopLevel && (
                              <label
                                name={`${question}.questionText`}
                                className="field"
                                key={index}
                              >
                                {question && question.questionText}
                                <Field name={`questions.${index}.answer`} />
                                {/* <Field name={`questions.${index}.answer`} /> */}
                                {
                                isBool && (
                                  <Field
                                    as="select"
                                    name={`questions.${index}.answer`}
                                  >
                                    <RenderOptions/>
                                  </Field>
                                )}
                                {
                                isText && (
                                  <Field
                                    as="textarea"
                                    name={`questions.${index}.answer`}
                                  />
                                )}
                              </label>
                            )}
                          </div>
                        );
                      })
                    : ""}
                  <button type="submit">Submit</button>
                </div>
              )}
            />
          </Form>
        )}
      />

      //   <Form className="signup-form">
      //     <label htmlFor="firstName">
      //       Are your hospital/health system product or service decisions made by
      //       a Value Analysis?
      //     </label>
      //     <Field name="firstName" type="text" />
      //     <ErrorMessage name="firstName" />
      //     <label htmlFor="lastName">Last Name</label>
      //     <Field name="lastName" type="text" />
      //     <ErrorMessage name="lastName" />
      //     <label htmlFor="email">Email Address</label>
      //     <Field name="email" type="email" />
      //     <ErrorMessage name="email" />
      //     <button type="submit">Submit</button>
      //   </Form>
      // </Formik>
    )
  );
};

export default Questionaire;

const RenderOptions = ({ isBool = true, options }) => {
  return (
    <Fragment>
      <option value='1'>Yes</option>
      <option value='0'>No</option>
    </Fragment>
  );
};

const FieldOption = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};
