import api from '../utils/axios';

// Public playlists
export const getPublicPlaylists = async () => {
  const response = await api.get('/public-playlists/');
  return response.data;
};

// User's playlists
export const getUserPlaylists = async () => {
  const response = await api.get('/playlists/');
  return response.data;
};

export const getPlaylistById = async (id) => {
  const response = await api.get(`/playlists/${id}/`);
  return response.data;
};

export const createPlaylist = async (formData) => {
  const response = await api.post('/playlists/', formData);
  return response.data;
};

export const updatePlaylist = async (id, data) => {
  const response = await api.put(`/playlists/${id}/`, data);
  return response.data;
};

export const patchPlaylist = async (id, data) => {
  const response = await api.patch(`/playlists/${id}/`, data);
  return response.data;
};

export const deletePlaylist = async (id) => {
  const response = await api.delete(`/playlists/${id}/`);
  return response.data;
};

// Playlist-Song Relations
export const getPlaylistSongs = async () => {
  const response = await api.get('/playlist-songs/');
  return response.data;
};

export const addSongToPlaylist = async (data) => {
  const response = await api.post('/playlist-songs/', data);
  return response.data;
};

export const updatePlaylistSong = async (id, data) => {
  const response = await api.put(`/playlist-songs/${id}/`, data);
  return response.data;
};

export const patchPlaylistSong = async (id, data) => {
  const response = await api.patch(`/playlist-songs/${id}/`, data);
  return response.data;
};

export const deletePlaylistSong = async (id) => {
  const response = await api.delete(`/playlist-songs/${id}/`);
  return response.data;
};

export const getPlaylistDetailsWithSongs = async (id) => {
  const response = await api.get(`/playlist/${id}/`);
  return response.data;
};
