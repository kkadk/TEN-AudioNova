import api from '../utils/axios';

// Songs
export const getUserSongs = async () => {
  const response = await api.get('/songs/');
  return response.data;
};

export const uploadSong = async (formData) => {
  const response = await api.post('/songs/', formData);
  return response.data;
};

export const updateSong = async (id, data) => {
  const response = await api.put(`/songs/${id}/`, data);
  return response.data;
};

export const patchSong = async (id, data) => {
  const response = await api.patch(`/songs/${id}/`, data);
  return response.data;
};

export const deleteSong = async (id) => {
  const response = await api.delete(`/songs/${id}/`);
  return response.data;
};

export const playSong = async (id) => {
  try {
    const response = await api.post(`/songs/${id}/play/`, {}, {
      responseType: 'blob', // This should be in the config object, not the data
      headers: {
        'Accept': 'audio/mpeg, audio/*, */*'
      }
    });

    // Validate response
    if (!response.data || !(response.data instanceof Blob)) {
      throw new Error('Invalid response: expected blob data')
    }

    // Check if blob is empty
    if (response.data.size === 0) {
      throw new Error('Received empty audio file')
    }

    return response.data;
  } catch (error) {
    // Provide more detailed error information
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data instanceof Blob
        ? await error.response.data.text()
        : error.response.data?.error || 'Server error'
      throw new Error(`Server error: ${errorMessage}`)
    } else if (error.request) {
      // Request was made but no response
      throw new Error('Network error: No response from server')
    } else {
      // Something else happened
      throw new Error(`Request error: ${error.message}`)
    }
  }
}

export const likeSong = async (id) => {
  const response = await api.post(`/songs/${id}/like/`);
  return response.data;
};

export const unlikeSong = async (id) => {
  const response = await api.post(`/songs/${id}/unlike/`);
  return response.data;
};

export const searchSongs = async (params) => {
  const query = new URLSearchParams(params).toString();
  const response = await api.get(`/search-songs/?${query}`);
  return response.data;
};

export const getLikedSongs = async () => {
  const response = await api.get('/liked-songs/');
  return response.data;
};

export const getPlaybackHistory = async () => {
  const response = await api.get('/playback-history/');
  return response.data;
};
