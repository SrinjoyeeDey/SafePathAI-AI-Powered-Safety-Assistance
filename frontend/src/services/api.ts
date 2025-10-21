import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", 
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});




export const getDiscussions = () => api.get('/community/discussions');


export const createDiscussion = (title: string, content: string) => {
  return api.post('/community/discussions', { title, content });
};


export const postVote = (discussionId: string, voteType: 'up' | 'down') => {
  return api.post('/community/vote', { discussionId, voteType });
};



export default api;