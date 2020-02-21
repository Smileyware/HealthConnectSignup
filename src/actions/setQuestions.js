import { SET_QUESTIONS } from './types';

const setQuestions = (payload) => {
    return {
      type: SET_QUESTIONS,
      payload
    }
  }
  export default setQuestions;
