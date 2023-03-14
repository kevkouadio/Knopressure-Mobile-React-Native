import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

const service = axios.create({
  baseURL: 'http://10.0.0.137:3000', // backend server URL
});

const signup = (user) => service.post('/signup', user);

const login = (user) => service.post('/login', user).then((response) => {
  const { token } = response.data;
  SecureStore.setItemAsync('token', token);
  return token;
});

const getUserProfile = async () => {
  try {
    const token = await SecureStore.getItemAsync('token'); 
    const decoded = jwtDecode(token);
    // check if the token has expired
    if (decoded.exp * 1000 < Date.now()) {
      await refreshToken();
    }
    const { id: userId } = jwtDecode(token);
    //console.log(userId)
    const response = await service.get(`/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error.response.status);
  }
};

const getAllBPData = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    // check if the token has expired
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      await refreshToken();
    }
    //console.log(token)
    const response = await service.get('/bp', {
      headers: {
        'auth-token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createBpData = async (bpData) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    // check if the token has expired
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      await refreshToken();
    }
    const response = await service.post('/bp', bpData, {
      headers: {
        'auth-token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }
};


const readBpData = async (id) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    // check if the token has expired
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      await refreshToken();
    }
    const response = await service.get(`/bp/${id}`, {
      headers: {
        'auth-token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error.response.status);
  }
};

const updateBpData = async (id, bpData) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    // check if the token has expired
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      await refreshToken();
    }
    const response = await service.put(`/bp/${id}`, bpData, {
      headers: {
        'auth-token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error.response.status);
  }
};

const deleteBpData = async (id) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    // check if the token has expired
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      await refreshToken();
    }
    const response = await service.delete(`/bp/${id}`, {
      headers: {
        'auth-token': `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error.response.status);
  }
};

const refreshToken = async () => {
  try {
    await SecureStore.deleteItemAsync('token');
    const token = await SecureStore.getItemAsync('token');
    const response = await service.post('/refreshToken', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const newToken = response.data.token;
    SecureStore.setItemAsync('token', newToken); 
    console.log(newToken);
    return newToken;
  } catch (error) {
    console.error(error); 
  }
};

export {
  signup,
  login,
  getUserProfile,
  getAllBPData,
  createBpData,
  readBpData,
  updateBpData,
  deleteBpData
}; 