import { fetchImages } from './js/pixabay-api';
import { createImageCard } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const pictureName = document.querySelector('#picture-picker');
  const searchButton = document.querySelector('#Search-btn');
  const resultContent = document.querySelector('#results');
  const fetchLoadMoreBtn = document.querySelector('#Load-more');

  let page = 1;
  const perPage = 15;
  let currentQuery = '';
  let lightbox = null;

  const loadingIndicator = document.createElement('div');
  loadingIndicator.id = 'loading-indicator';
  loadingIndicator.classList.add('loading-indicator');
  loadingIndicator.textContent = 'Loading images, please wait';
  loadingIndicator.style.display = 'none';
  document.body.appendChild(loadingIndicator);

  async function search() {
    const searchedPicture = pictureName.value.trim();

    if (!searchedPicture) {
      iziToast.error({
        title: 'Error',
        message: `Please enter picture description`,
      });
      return;
    }

    loadingIndicator.style.display = 'block';
    currentQuery = searchedPicture;
    page = 1;
    resultContent.innerHTML = '';
    fetchLoadMoreBtn.style.display = 'none';

    try {
      const data = await fetchImages(currentQuery, page, perPage);

      if (data.hits.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      data.hits.forEach(hit => {
        const card = createImageCard(hit);
        resultContent.appendChild(card);
      });

      if (!lightbox) {
        lightbox = new SimpleLightbox('.lightbox-item');
      } else {
        lightbox.refresh();
      }

      if (data.totalHits > page * perPage) {
        fetchLoadMoreBtn.style.display = 'flex';
      }
    } catch (error) {
      iziToast.error({
        message: error.message || 'Something goes wrong. Please try again!',
      });
      console.error('Error', error);
    } finally {
      loadingIndicator.style.display = 'none';
      pictureName.value = '';
    }
  }

  async function loadMore() {
    page += 1;

    try {
      loadingIndicator.style.display = 'block';

      const data = await fetchImages(currentQuery, page, perPage);

      data.hits.forEach(hit => {
        const card = createImageCard(hit);
        resultContent.appendChild(card);
      });

      lightbox.refresh();

      if (page * perPage >= data.totalHits) {
        fetchLoadMoreBtn.style.display = 'none';
      }
    } catch (error) {
      iziToast.error({
        message: error.message || 'Something goes wrong. Please try again!',
      });
      console.error('Error:', error);
    } finally {
      loadingIndicator.style.display = 'none';
    }
  }

  searchButton.addEventListener('click', search);
  fetchLoadMoreBtn.addEventListener('click', loadMore);
});
