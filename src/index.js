import { image as processImage } from 'stackblur-canvas';

const styles = {
  wrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    opacity: 1,
    transition: 'all 0.4s ease-in-out',
  },
  thumbnail: {
    position: 'absolute',
    width: '100%',
    opacity: 0,
    transition: 'all 0.4s ease-in-out',
  },
  canvas: {
    position: 'absolute',
    zIndex: 1,
    opacity: 1,
    transition: 'all 0.4s ease-in-out',
  },
};

class ProgressiveImage extends HTMLElement {
  constructor() {
    super();
    this.wrapper = ProgressiveImage.createElement('div', 'wrapper');
    this.image = ProgressiveImage.createElement('img', 'image');
    this.thumbnail = ProgressiveImage.createElement('img', 'thumbnail');
    this.canvas = ProgressiveImage.createElement('canvas', 'canvas');

    this.src = '';
    this.thumb = '';
    this.blur = 12;
  }

  connectedCallback() {
    this.populateAttributes();

    this.image.src = this.thumb;
    this.thumbnail.crossOrigin = 'Anonymous';
    this.thumbnail.src = this.thumb;

    this.thumbnail.onload = this.onThumbnailLoad.bind(this);

    this.populateDOM();
  }

  static createElement(type, name) {
    const element = document.createElement(type);
    return ProgressiveImage.attachStyle(element, styles[name]);
  }

  static attachStyle(node, style) {
    Object.keys(style).forEach((key) => {
      // eslint-disable-next-line no-param-reassign
      node.style[key] = style[key];
    });
    return node;
  }

  populateAttributes() {
    this.getAttributeNames().forEach((attr) => {
      const value = this.getAttribute(attr);
      switch (attr) {
        case 'src': {
          this.src = value;
          break;
        }
        case 'thumbnail': {
          this.thumb = value;
          break;
        }
        case 'blur': {
          this.blur = Number(value) || 12;
          break;
        }
        default: {
          this.wrapper.setAttribute(attr, value);
        }
      }
    });
  }

  populateDOM() {
    this.wrapper.appendChild(this.canvas);
    this.wrapper.appendChild(this.thumbnail);
    this.wrapper.appendChild(this.image);

    this.appendChild(this.wrapper);
  }

  onImageLoad() {
    this.canvas.style.opacity = 0;
    this.thumbnail.style.opacity = 0;
    this.image.style.opacity = 1;
  }

  onThumbnailLoad() {
    processImage(this.thumbnail, this.canvas, this.blur, false, true);

    this.image.src = this.src;
    this.image.onload = this.onImageLoad.bind(this);
  }
}

customElements.define('progressive-image', ProgressiveImage);
