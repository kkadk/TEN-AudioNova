// // // // import api from '../utils/axios';

// // // // export const login = async (username, password) => {
// // // //   const response = await api.post('/auth/login/', { username, password });
// // // //   return response.data;
// // // // };

// // // // export const register = async (username, email, password) => {
// // // //     const response = await api.post('/auth/register/', { username, email, password });
// // // //   return response.data;
// // // // }

// // // // export const verifyEmail = async (token) => {
// // // //     const response = await api.get(`/auth/verify-email/${token}/`);
// // // //     return response.data;
// // // // };

// // // // export const refreshToken = async (refresh) => {
// // // //     const response = await api.post('/auth/token/refresh/', { refresh });
// // // //     return response.data;
// // // // };

// // // import api from '../utils/axios';

// // // export const login = async (email, password) => {
// // //   const response = await api.post('/auth/login/', { email, password });
// // //   return response.data;
// // // };

// // // export const register = async (username, email, password) => {
// // //   const response = await api.post('/auth/register/', { username, email, password });
// // //   return response.data;
// // // };

// // // export const verifyEmail = async (token) => {
// // //   const response = await api.get(`/auth/verify-email/${token}/`);
// // //   return response.data;
// // // };

// // // export const refreshToken = async () => {
// // //   const response = await api.post('/auth/token/refresh/');
// // //   return response.data;
// // // };


// // import api from '../utils/axios';

// // // export const login = async (email, password) => {
// // //   const response = await api.post('/auth/login/', { email, password });
// // //   return response.data;
// // // };

// // export const login = async (email, password) => {
// //   const response = await api.post('/auth/login/', { email, password });
// //   return response.data;
// // };

// // export const register = async (username, email, password) => {
// //   const response = await api.post('/auth/register/', { username, email, password });
// //   return response.data;
// // };

// // export const verifyEmail = async (token) => {
// //   const response = await api.get(`/auth/verify-email/${token}/`);
// //   return response.data;
// // };

// // export const refreshToken = async () => {
// //   const response = await api.post('/auth/token/refresh/');
// //   return response.data;
// // };

// // export const forgotPassword = async (email) => {
// //   const response = await api.post('/auth/forgot-password/', { email });
// //   return response.data;
// // };

// // export const resetPassword = async (token, newPassword) => {
// //   const response = await api.post(`/auth/reset-password/${token}/`, { new_password: newPassword });
// //   return response.data;
// // };
// import api from '../utils/axios';

// export const login = async (email, password) => {
//   const response = await api.post('/auth/login/', { email, password });
//   return response.data;
// };

// export const register = async (username, email, password) => {
//   const response = await api.post('/auth/register/', { username, email, password });
//   return response.data;
// };

// export const verifyEmail = async (token) => {
//   const response = await api.get(`/auth/verify-email/${token}/`);
//   return response.data;
// };

// export const refreshToken = async () => {
//   const refresh = localStorage.getItem('refreshToken');
//   const response = await api.post('/auth/token/refresh/', { refresh });
//   return response.data;
// };

// export const forgotPassword = async (email) => {
//   const response = await api.post('/auth/forgot-password/', { email });
//   return response.data;
// };

// export const resetPassword = async (token, newPassword) => {
//   const response = await api.post(`/auth/reset-password/${token}/`, { new_password: newPassword });
//   return response.data;
// };


import api from "../utils/axios";

export const login = async (email, password) => {
  const response = await api.post("/auth/login/", { email, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post("/auth/register/", { username, email, password });
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await api.get(`/auth/verify-email/${token}/`);
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post("/auth/token/refresh/");
  return response.data;
};

// ✅ New functions for profile

export const getUserProfile = async () => {
  const response = await api.get("/auth/user/profile/");
  return response.data;
};

export const updateUserProfile = async (form) => {
  const response = await api.put("/auth/user/profile/", form);
  return response.data;
};
