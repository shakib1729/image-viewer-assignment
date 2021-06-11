import images from './imagesData.js';

const mainElement = document.getElementById('main');
const unorderedListElement = document.querySelector('.img-list');
const largeImageContainerElement = document.querySelector('.img-container');
let listIndex = 0; // The index of currently selected list item

const createImage = (imageSource, imageTitle) => {
  // This function creates an <img> element
  const imgElement = document.createElement('img');
  imgElement.src = imageSource;
  imgElement.alt = imageTitle;
  return imgElement;
};

const truncate = (str, maxLen) => {
  // This function truncates the title if its length is greater than 'maxLen'
  const currLen = str.length;
  if (currLen <= maxLen) return str;
  const leftHalf = Math.floor(maxLen / 2) - 1,
    rightHalf = Math.floor(maxLen / 2) - 2;

  const newStr =
    str.slice(0, leftHalf) + '...' + str.slice(currLen - rightHalf);

  return newStr;
};

const createTitle = (imageTitle) => {
  // This function creates a <h4> element
  const titleElement = document.createElement('h4');
  titleElement.innerText = imageTitle;
  return titleElement;
};

const createListElement = (imageSource, imageTitle, maxLenOfEachTitle) => {
  // This function creates a <li> element
  // which contains <img> and <h4> elements
  // <img> contains the image
  // <h4> contains the title of the image
  const listElement = document.createElement('li');
  const imgElement = createImage(imageSource, imageTitle);
  const truncatedTitle = truncate(imageTitle, maxLenOfEachTitle);
  const titleElement = createTitle(truncatedTitle);

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

const displayImageList = (imageList, maxLenOfEachTitle) => {
  // This function renders all the images in the list
  imageList.forEach((img, index) => {
    const listElement = createListElement(
      img.previewImage,
      img.title,
      maxLenOfEachTitle
    );
    if (index === 0) {
      listElement.classList.add('active'); // By default, first list item is active
    }
    unorderedListElement.appendChild(listElement);
  });
  createLargeImage(imageList[0].previewImage, imageList[0].title);
};

const setActiveImage = (element) => {
  // This function removes the 'active' class from the currently
  // active list item and
  // adds 'active' class to the 'element' which is passed as argument
  const currentActiveElement = document.querySelector('.active');
  if (currentActiveElement) {
    currentActiveElement.classList.remove('active');
  }
  element.classList.add('active');
};

const updateLargeImage = (imageSource, imageName) => {
  // This function sets the large image and its title
  const largeImageElement = largeImageContainerElement.firstElementChild;
  const largeImageTextElement = largeImageElement.nextElementSibling;

  largeImageElement.src = imageSource;
  largeImageElement.alt = imageName;
  largeImageTextElement.innerText = imageName;
};

const updateListIndex = (imgElement) => {
  // This function updates the index of currently selected list item
  const listItems = document.querySelectorAll('li');
  listItems.forEach((item, index) => {
    if (item.firstElementChild === imgElement) {
      listIndex = index;
    }
  });
};

const getMaxLenOfEachTitle = () => {
  // This function calculates the maximum number of characters
  // which should be present in the list item title
  // based on the available width for the list element

  const widthOfListItem = unorderedListElement.getBoundingClientRect().width;
  const listImageElement = document.querySelector('.small-img');
  let widthOfListImage = 32; // Default width of list images
  if (listImageElement)
    widthOfListImage = listImageElement.getBoundingClientRect().width;
  const availableWidth = widthOfListItem - widthOfListImage;
  const maxLenOfEachTitle = Math.floor(availableWidth / 8); // 1ch ~ 8px

  console.log(widthOfListItem, maxLenOfEachTitle);
  return maxLenOfEachTitle;
};

const handleClick = (event) => {
  // This function handles the 'click' event when a list item is clicked
  let parentListElement;
  if (event.target.tagName.toLowerCase() === 'ul') {
    return;
  } else if (event.target.tagName.toLowerCase() === 'li') {
    parentListElement = event.target;
  } else {
    parentListElement = event.target.parentElement;
  }

  const currImageElement = parentListElement.firstElementChild;

  updateLargeImage(currImageElement.src, currImageElement.alt);
  setActiveImage(parentListElement);
  updateListIndex(currImageElement);
};

const handleKeyPress = (event) => {
  // This function handles when a keyboard arrow up/down is pressed
  const listItems = document.querySelectorAll('li');
  if (event.key === 'ArrowDown') {
    listIndex++;
    if (listIndex === listItems.length) listIndex = 0;
  } else if (event.key === 'ArrowUp') {
    listIndex--;
    if (listIndex === -1) listIndex = listItems.length - 1;
  }
  const parentListElement = listItems[listIndex];
  const currImageElement = parentListElement.firstElementChild;
  updateLargeImage(currImageElement.src, currImageElement.alt);
  setActiveImage(parentListElement);
};

const handleResize = () => {
  // This function re-renders the list items when the window is resized
  unorderedListElement.innerHTML = '';
  largeImageContainerElement.innerHTML = '';

  const maxLenOfEachTitle = getMaxLenOfEachTitle();

  displayImageList(images, maxLenOfEachTitle);
};

window.addEventListener('resize', handleResize);
unorderedListElement.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyPress);

// Render the list items
const maxLenOfEachTitle = getMaxLenOfEachTitle();
displayImageList(images, maxLenOfEachTitle);
