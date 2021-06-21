import images from './imagesData.js';

const unorderedListElement = document.querySelector('.img-list');
const largeImageContainerElement = document.querySelector(
  '.large-img-container'
);
const largeImageTitleElement = document.querySelector('.large-img-title');

let listIndex = 0; // The index of currently selected list item

const createImage = (imageSource, imageTitle) => {
  // This function creates an <img> element
  const imgElement = document.createElement('img');
  imgElement.src = imageSource;
  imgElement.alt = imageTitle;
  return imgElement;
};

const createTitle = (imageTitle) => {
  // This function creates a <h4> element
  const titleElement = document.createElement('h4');
  titleElement.innerText = imageTitle;
  return titleElement;
};

const createListElement = (imageSource, imageTitle) => {
  // This function creates a <li> element
  // which contains <img> and <div> elements
  // <img> contains the image
  // <div> contains <h4> which is the title of the image
  const listElement = document.createElement('li');
  const imgElement = createImage(imageSource, imageTitle);
  const titleElement = createTitle(imageTitle);
  const titleElementContainer = document.createElement('div');
  titleElementContainer.appendChild(titleElement);

  listElement.classList.add('list-item');
  imgElement.classList.add('small-img');
  titleElementContainer.classList.add('title-container');

  listElement.appendChild(imgElement);
  listElement.appendChild(titleElementContainer);

  return listElement;
};

const createLargeImage = (imageSource, imageTitle) => {
  // This function creates the large image
  // which is displayed on the right side
  const imgElement = createImage(imageSource, imageTitle);
  const titleElement = createTitle(imageTitle);

  imgElement.classList.add('large-img');

  largeImageContainerElement.appendChild(imgElement);
  largeImageTitleElement.appendChild(titleElement);
};

const getMaxPossibleStringBinarySearch = (
  title,
  titleElement,
  availableWidth
) => {
  let start = 1,
    end = title.length / 2;

  let selectedText;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const truncated =
      title.slice(0, mid) + '...' + title.slice(title.length - mid);
    titleElement.innerText = truncated;
    const titleWidth = titleElement.getBoundingClientRect().width;
    if (titleWidth <= availableWidth) {
      start = mid + 1;
      selectedText = truncated;
    } else {
      end = mid - 1;
    }
  }

  return selectedText;
};

const truncateTitle = (listElement) => {
  // This function truncates the title of the 'listElement'
  // which is passed as argument

  const titleElementContainer = listElement.lastElementChild;
  const titleElement = titleElementContainer.firstElementChild;
  const title = titleElement.innerText;
  const availableWidth = titleElementContainer.getBoundingClientRect().width; // The max available width for this title

  const titleWidth = titleElement.getBoundingClientRect().width; // The current width of the title

  if (availableWidth >= titleWidth) {
    return; // If no truncation is required, then return
  }

  // Applying Binary Search to find the largest length
  // which fits inside the container
  const truncatedTitle = getMaxPossibleStringBinarySearch(
    title,
    titleElement,
    availableWidth
  );
  titleElement.innerText = truncatedTitle;
};

const truncateImageList = () => {
  // This function loops through all the list items
  // and truncates the title which is overflowing
  const listItems = document.querySelectorAll('li');
  listItems.forEach((item) => {
    truncateTitle(item);
  });
};

const displayImageList = (imageList) => {
  // This function renders all the images in the list
  imageList.forEach((img, index) => {
    const listElement = createListElement(img.previewImage, img.title);
    if (index === listIndex) {
      listElement.classList.add('active'); // By default, list item at 'listIndex' is active
    }
    unorderedListElement.appendChild(listElement);
  });

  // Truncate the titles in the list
  truncateImageList();

  createLargeImage(
    imageList[listIndex].previewImage,
    imageList[listIndex].title
  );
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
  largeImageContainerElement.innerHTML = '';
  largeImageTitleElement.innerHTML = '';

  createLargeImage(imageSource, imageName);
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

const handleClick = (event) => {
  // This function handles the 'click' event when a list item is clicked

  let parentListElement; // Get the currently clicked list element, which is the parent for the image element
  if (event.target.tagName.toLowerCase() === 'ul') {
    return; // When clicked on the empty space below list items, nothing should happen
  } else if (event.target.tagName.toLowerCase() === 'li') {
    parentListElement = event.target;
  } else if (
    event.target.tagName.toLowerCase() === 'img' ||
    event.target.tagName.toLowerCase() === 'div'
  ) {
    parentListElement = event.target.parentElement;
  } else if (event.target.tagName.toLowerCase() === 'h4') {
    parentListElement = event.target.parentElement.parentElement;
  }

  const currImageElement = parentListElement.firstElementChild; // Get the image present under the currently clicked list element

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

  const parentListElement = listItems[listIndex]; // Get the currently selected list element, which is the parent for the image element
  const currImageElement = parentListElement.firstElementChild; // Get the image present under the currently selected list element

  updateLargeImage(currImageElement.src, currImageElement.alt);
  setActiveImage(parentListElement);
};

const handleResize = () => {
  // This function re-renders the list items when the window is resized
  unorderedListElement.innerHTML = '';
  largeImageContainerElement.innerHTML = '';
  largeImageTitleElement.innerHTML = '';

  displayImageList(images);
};

// Setup 3 event listeners:

// 1) Listen for 'resize' event and as soon as the window is resized, re-render the list items
window.addEventListener('resize', handleResize);

// 2) Listen for 'click' on the list items
unorderedListElement.addEventListener('click', handleClick);

// 3) Listen for 'keydown' for navigating using arrow keys
document.addEventListener('keydown', handleKeyPress);

// Render the initial list items
displayImageList(images);
