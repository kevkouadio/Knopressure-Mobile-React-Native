import axios from 'axios';

const service = axios.create({
  baseURL: 'http://10.0.0.137:3000', // backend server URL
});

const signup = (user) => service.post('/signup', user);
const login = (user) => service.post('/login', user);

export { signup, login };

//import axios from 'axios';

// const backend_URL = "https://data.mongodb-api.com/app/data-dwhpj/endpoint/data/v1";

// export const Service = {
//   async login(credentials) {
//     try {
//       const { data } = await axios.post('/login', credentials);
//       return data;
//     } catch (error) {
//       console.error(error);
//     }
//   },
// };
