const images = [
  {
    previewImage:
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    title: 'cat.jpeg',
  },
  {
    previewImage:
      'https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    title: 'cooking couple shoot portofilio(1).jpg',
  },
  {
    previewImage:
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    title: 'bali-kelingking-beach-plastic-removal-drive.key',
  },
  {
    previewImage:
      'https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    title: 'NextByk Investor Pitch 2021.ppt',
  },
  {
    previewImage:
      'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    title: 'interns-performance-report-june-2021.key',
  },
];

const mainElement = document.getElementById('main');
const unorderedListElement = document.querySelector('.img-list');
const largeImageContainerElement = document.querySelector('.img-container');

const createListElement = (src, title) => {
  const listElement = document.createElement('li');
  const imgElement = document.createElement('img');
  imgElement.src = src;
  imgElement.alt = title;
  const titleElement = document.createElement('h4');
  titleElement.innerText = title;
  listElement.appendChild(imgElement);
  listElement.appendChild(titleElement);
  listElement.classList.add('list-item');
  imgElement.classList.add('small-img');
  return listElement;
};

const displayImageList = (imageList) => {
  imageList.forEach((img) => {
    const listElement = createListElement(img.previewImage, img.title);
    unorderedListElement.appendChild(listElement);
  });
};

displayImageList(images);
