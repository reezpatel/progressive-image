var ROWS = 0;
var page = 0;
var lock = false;

var container = document.getElementById('content');

var url = function getUrl(page) {
  return `https://serverless.reez.dev/demo/progressive-image?page=${page}`;
};

function createCols() {
  Array(ROWS)
    .fill(1)
    .forEach(function append() {
      container.appendChild(document.createElement('div'));
    });
}

function renderImage(image) {
  var children = container.children;

  var smallest = Number.MAX_VALUE;
  var index = -1;

  for (var i = 0; i < children.length; i++) {
    if (children.item(i).clientHeight < smallest) {
      smallest = children.item(i).clientHeight;
      index = i;
    }
  }

  var pImage = document.createElement('progressive-image');
  pImage.setAttribute('src', `${image.src}&date=${new Date().getTime()}`);
  pImage.setAttribute(
    'thumbnail',
    `${image.thumbnail}&date=${new Date().getTime()}`,
  );

  children.item(index).appendChild(pImage);
}

async function loadImages() {
  lock = true;
  var response = await fetch(url(page));
  var data = await response.json();

  data.forEach(renderImage);

  page += 1;
  lock = false;
}

function init() {
  ROWS = 3;
  page = 1;

  createCols();
  loadImages();
}

window.addEventListener('DOMContentLoaded', init);

document.onscroll = function onScroll(e) {
  var height = document.body.clientHeight - 4 * window.innerHeight;
  var offset = window.pageYOffset || document.documentElement.scrollTop;

  if (offset > height && !lock) {
    loadImages();
  }
};
