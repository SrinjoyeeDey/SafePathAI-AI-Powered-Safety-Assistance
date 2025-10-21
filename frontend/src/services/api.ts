// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:4000/api",
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;
import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:4000/api",  // since Vite proxy forwards "/api" to backend
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
// Update this function in api.ts
export const createDiscussion = (data: { title: string; content: string; categoryId: string; tags: string[] }) => {
  return api.post('/community/discussions', {
    title: data.title,
    content: data.content,
    categoryId: data.categoryId, // Send categoryId
    tags: data.tags // Send tags
  });
};
// Replace the old postVote function with this one in api.ts
export const postVote = (discussionId: string, voteType: 'up' | 'down') => {
  // Convert 'up'/'down' to 'upvote'/'downvote' before sending
  const backendVoteType = voteType === 'up' ? 'upvote' : 'downvote'; 

  return api.post('/community/vote', { 
    targetId: discussionId,
    targetType: 'discussion', 
    voteType: backendVoteType // Send the full word
  });
};

export default api;

