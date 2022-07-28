import axios from 'axios';

const API_KEY = '24173748-6ba7fcb8e3b5f3e38287e597b';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}&key=${API_KEY}`);
  return data;
};
