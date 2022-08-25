import axios from 'axios';

axios.interceptors.response.use(null, err => {
  const expredErrors = 
    err.response &&
    err.response.status >= 400 &&
    err.response.status < 500;

  return Promise.reject(err);
});

export default  {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};