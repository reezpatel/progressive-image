var ROWS = 0;
var page = 0;
var lock = false;

var container = document.getElementById("content");
var url = (page) =>
  `https://serverless.reez.dev/demo/progressive-image?page=${page}`;

function createCols() {
  Array(ROWS)
    .fill(1)
    .forEach(() => {
      container.appendChild(document.createElement("div"));
    });
}

function renderImage(image) {
  console.log(image);
  const children = container.children;

  let smallest = Number.MAX_VALUE;
  let index = -1;

  for (let i = 0; i < children.length; i++) {
    if (children.item(i).clientHeight < smallest) {
      smallest = children.item(i).clientHeight;
      index = i;
    }
  }

  const pImage = document.createElement("progressive-image");
  pImage.setAttribute("src", `${image.src}&date=${new Date().getTime()}`);
  pImage.setAttribute(
    "thumbnail",
    `${image.thumbnail}&date=${new Date().getTime()}`
  );

  children.item(index).appendChild(pImage);
}

async function loadImages() {
  lock = true;
  const response = await fetch(url(page));
  const data = await response.json();

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

window.addEventListener("DOMContentLoaded", init);

document.onscroll = function onScroll(e) {
  const height = document.body.clientHeight - 4 * window.innerHeight;
  const offset = window.pageYOffset || document.documentElement.scrollTop;

  if (offset > height && !lock) {
    loadImages();
  }
};
