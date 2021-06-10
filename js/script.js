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

const createImage = (imageSource, imageTitle) => {
  const imgElement = document.createElement('img');
  imgElement.src = imageSource;
  imgElement.alt = imageTitle;
  return imgElement;
};

const createTitle = (imageTitle) => {
  const titleElement = document.createElement('h4');
  titleElement.innerText = imageTitle;
  return titleElement;
};

const createListElement = (imageSource, imageTitle) => {
  // This function creates a <li> element
  // which contains <img> and <h4> elements
  // <img> contains the image
  // <h4> contains the title of the image
  const listElement = document.createElement('li');
  const imgElement = createImage(imageSource, imageTitle);
  const titleElement = createTitle(imageTitle);

  listElement.classList.add('list-item');
  imgElement.classList.add('small-img');

  listElement.appendChild(imgElement);
  listElement.appendChild(titleElement);

  return listElement;
};

const createLargeImage = (imageSource, imageTitle) => {
  // This function creates the markup of the large image
  // which is displayed on the right side
  const imgElement = createImage(imageSource, imageTitle);
  const titleElement = createTitle(imageTitle);

  imgElement.classList.add('large-img');

  largeImageContainerElement.appendChild(imgElement);
  largeImageContainerElement.appendChild(titleElement);
};

const displayImageList = (imageList) => {
  // This function renders all the images in the list
  imageList.forEach((img) => {
    const listElement = createListElement(img.previewImage, img.title);
    unorderedListElement.appendChild(listElement);
  });
  createLargeImage(imageList[0].previewImage, imageList[0].title);
};

const setActiveImage = (element) => {
  const currentActiveElement = document.querySelector('.active');
  if (currentActiveElement) {
    currentActiveElement.classList.remove('active');
  }
  element.classList.add('active');
};

const updateLargeImage = (imageSource, imageName) => {
  const largeImageElement = largeImageContainerElement.firstElementChild;
  const largeImageTextElement = largeImageElement.nextElementSibling;

  largeImageElement.src = imageSource;
  largeImageElement.alt = imageName;
  largeImageTextElement.innerText = imageName;
};

const handleClick = (event) => {
  const parentElement = event.target.parentElement;
  const currImageElement = parentElement.firstElementChild;

  updateLargeImage(currImageElement.src, currImageElement.alt);
  setActiveImage(parentListElement);
};

unorderedListElement.addEventListener('click', handleClick);

displayImageList(images);
