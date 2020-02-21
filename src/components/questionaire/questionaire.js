import React, { useState, Fragment } from 'react';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './questionaire.css';
import setQuestions from '../../actions/setQuestions';
import { postQuestionsApi } from '../../Api.js';

const Questionaire = ({ questions }) => {
  const [questionsList, setQuestionsList] = useState(null);

  function questionsResponse(result) {
    if (!result || result == 'Error') {
      alert('Error getting questions');
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            postQuestionsApi(values, callback);
            function callback(result) {
              if (!result || result == 'Error') {
                alert(`Error: ${result}`);
                return;
              }
              window.location.assign(
                `${window.location.href}ProviderApplication`
              );
            }
            setSubmitting(false);
          }, 400);
        }}
        render={props => <HealthConnectForm {...props} />}
      />
    )
  );
};

export default Questionaire;

const HealthConnectForm = ({ values }) => (
  <Form>
    <FieldArray
      name='questions'
      render={arrprops => (
        <div className='questionaire'>
          {values.questions && values.questions.length > 0
            ? values.questions.map((question, index) => {
                const isBool = question && question.questionType == 'bool',
                  isNum = question && question.questionType == 'num',
                  isText = question && question.questionType == 'text',
                  isInput = question && !isBool && !isNum && !isText;
                const inputFieldsStr = isInput && question.questionType;

                const inputFields = inputFieldsStr && inputFieldsStr.split(',');
                const isTopLevel = question.isParent && !question.parent;
                const hasChild = question.isParent;

                const children =
                  hasChild &&
                  values.questions.map(
                    child => child.parent === question.Id
                  );
                const childType =
                  hasChild && children[0] && children[0].questionType && isBool;

                return (
                  <div>
                    {(
                      <label
                        name={`${question}.questionText`}
                        className='field'
                        key={index}
                      >
                        {question && question.questionText}
                        {isBool && (
                          <Field as='select' name={`questions.${index}.answer`}>
                            <BoolInput />
                          </Field>
                        )} */}
                        {hasChild && isBool && (
                          <Field
                            as='select'
                            name={`questions.${index}.answer`}
                          />
                        )}
                        {(isText && (
                          <Field
                            as='textarea'
                            name={`questions.${index}.answer`}
                          />
                        )) ||
                          (isInput && (
                              <Field component={
                                RenderOptions

                              } as='select' name={`questions.${index}.answer`} >
                          </Field>
                          ))}
                      </label>
                    )}
                  </div>
                );
              })
            : ''}
          <button type='submit'>Submit</button>
        </div>
      )}
    />
  </Form>
);

const BoolInput = () => {
  return (
    <Fragment>
      <option>Select</option>
      <option value='1'>
        Yes
      </option>
      <option value='0'>No</option>
    </Fragment>
  );
};

const RenderOptions = ({ options }) => {
  return (
    <Fragment>
      <option>Select</option>
      <option value='1'>
        Yes
      </option>
      <option value='0'>No</option>
    </Fragment>
  );
};

const FieldOption = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};
