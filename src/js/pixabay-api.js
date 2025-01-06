import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '47996916-063d7568314d3761f2b5e2fb9';

export async function fetchImages(query, page, perPage) {
  try {
    const response = await axios.get('', {
      params: {
        key: apiKey,
        q: query,
        per_page: perPage,
        page: page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to downdload:', error.message);
  }
}
