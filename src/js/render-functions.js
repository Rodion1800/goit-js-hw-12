export function createImageCard(hit) {
  const card = document.createElement('div');
  card.classList.add('card');

  const link = document.createElement('a');
  link.href = hit.largeImageURL;
  link.classList.add('lightbox-item');

  const image = document.createElement('img');
  image.src = hit.webformatURL;
  image.alt = hit.tags;

  link.setAttribute('data-title', hit.tags);
  link.appendChild(image);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const stats = document.createElement('p');
  stats.innerHTML = `
    <span class="stat-item">Likes: ${hit.likes}</span> 
    <span class="stat-item">Views: ${hit.views}</span> 
    <span class="stat-item">Comments: ${hit.comments}</span> 
    <span class="stat-item">Downloads: ${hit.downloads}</span>
  `;

  cardInfo.appendChild(stats);
  card.appendChild(link);
  card.appendChild(cardInfo);

  return card;
}
