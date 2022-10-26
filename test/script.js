import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '1m',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function() {
  const maxProductId = 1000011;
  const randomProduct = Math.floor(Math.random() * maxProductId * 0.9) + 1;
  const getQuestions = http.get(`http://localhost:3000/qa/questions/?product_id=${randomProduct}`);

  const maxQuestionId = 3518963;
  const randomQuestion = Math.floor(Math.random() * maxQuestionId * 0.9) + 1;
  const getAnswers = http.get(`http://localhost:3000/qa/questions/${randomQuestion}/answers`);

  check(getQuestions, {
    'GET /qa/questions should return status 200' : (r) => r.status === 200,
  });

  check(getAnswers, {
    'GET /qa/questions/:question_id/answers should return status 200' : (r) => r.status === 200,
  });
};