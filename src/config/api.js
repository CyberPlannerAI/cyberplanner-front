const API_URL = import.meta.env.VITE_API_URL || 'https://cyberplanner-back.onrender.com';

export const API_CONFIG = {
  baseUrl: API_URL,
  chatEndpoint: `${API_URL}/chat`
};
