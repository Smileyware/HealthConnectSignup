import Amplify from 'aws-amplify';
import { API } from 'aws-amplify';

const HcEndpoint = 'http://localhost:59210/api/';
const Questions = 'Questions';
const Answers = 'Answers';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: Questions,
        endpoint: `${HcEndpoint}`
      },
      {
        name: Answers,
        endpoint: `${HcEndpoint}`
      }
    ]
  }
});

export function getQuestionsApi (callback) {
  API.get(Questions, Questions)
    .then(response => {
      if (response != null) {
        callback(response);
      } else {
        alert('Error getting Questions: ' + response);
        callback('Error');
      }
    })
    .catch(error => {
      console.log(error.response);
      callback('Error');
    });
};

export function postQuestionsApi(props, callback) {

  const answers = props;
  let init = {
    body: {
     questionId: props.id,
      userId: props.userId,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };

  API.post(Questions, Questions, init)
    .then(response => {
      if (response !== null) {
        callback(response);
      } else {
        alert('Server Error: Couldnt Post Collection');
        callback('Error');
      }
    })
    .catch(error => {
      console.log('Error Posting Collection');
    });
};

export function postUserApi(props, callback) {
  let init = {
    body: {
        firstName: props.firstName,
          lastName: props.lastName,
          email: props.email,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };

  API.post(Questions, Questions, init)
    .then(response => {
      if (response !== null) {
        callback(response);
      } else {
        alert('Server Error: Couldnt Post User');
        callback('Error');
      }
    })
    .catch(error => {
      alert('Error Posting User');
      console.log('Error Posting User');
    });
};