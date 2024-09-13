import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  cloud: {
    // Project: Accident-detection
    projectID: 3712655,
    // Test runs with the same name groups test runs together.
    name: 'test1'
  }
};

export default function() {
  http.get('https://localhost:3000/api/v1/user/profile');
  sleep(1);
}