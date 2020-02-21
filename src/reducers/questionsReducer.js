export default (
  state = {
  questions: ""
}, action) => {
  switch (action.type) {
    case "set_questions":
      return {
        questions: action.payload
      };
    default:
      return state;
  }
};