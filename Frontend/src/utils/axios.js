// // import axios from 'axios';
// // import { refreshToken } from '../api/auth';

// // const api = axios.create({
// //   baseURL: import.meta.env.VITE_API_URL, // e.g., 'http://localhost:3000/api'
// // });

// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('accessToken');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // Add response interceptor for auto-refresh
// // api.interceptors.response.use(
// //   (res) => res,
// //   async (error) => {
// //     const originalRequest = error.config;

// //     // If 401 and refresh token available, try to refresh
// //     if (error.response?.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true;

// //       try {
// //         const refreshToken = localStorage.getItem('refreshToken');
// //         const res = await refreshToken(refreshToken)

// //         const newAccessToken = res.access;
// //         console.log(newAccessToken)
// //         localStorage.setItem('accessToken', newAccessToken);

// //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
// //         return api(originalRequest); // Retry original request
// //       } catch (refreshError) {
// //         // Clear storage and redirect to login
// //         localStorage.clear();
// //         window.location.href = '/login';
// //         return Promise.reject(refreshError);
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // export default api;


// import axios from 'axios';
// import { refreshToken } from '../api/auth';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // e.g., 'http://localhost:3000/api'
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await refreshToken();

//         const newAccessToken = res.access;
//         localStorage.setItem('accessToken', newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.clear();
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from 'axios';
import { refreshToken } from '../api/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., 'http://localhost:3000/api'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await refreshToken();
        const newAccessToken = res.access;

        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
