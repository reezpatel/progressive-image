# Progressive Image

![DESC](https://img.shields.io/static/v1?label=Description&message=Progressive%20Image%20Loader%20as%20a%20Web%20Component&color=blue&style=for-the-badge)

![NPM](https://img.shields.io/npm/v/blur-progressive-image?style=for-the-badge)

![DOWNLAOD](https://img.shields.io/npm/dw/blur-progressive-image?style=for-the-badge)

![SIZE](https://img.shields.io/bundlephobia/min/blur-progressive-image?style=for-the-badge)

![BUILD](https://img.shields.io/drone/build/reezpatel/progressive-image?server=https%3A%2F%2Fci.rlab.app&style=for-the-badge)

> NOTE: This is in alpha stage right, this is not ready for prod in any way.

Checkout Demo: **[https://www.devpunk.io](https://www.devpunk.io)**

## Install

Use `NPM` or `Github` Registry to install blur-progressive-image.

```bash
# With NPM
npm install blur-progressive-image

# With Yarn
yarn add blur-progressive-image
```

Alternative, you can use direct link from this repo

```
https://github.com/reezpatel/progressive-image/releases/download/v0.0.6/progressive-image.js
```

Or CDN,

```
https://cdn.jsdelivr.net/npm/blur-progressive-image/dist/progressive-image.js
```

## Usage

Since it is a web-component it is compatible with any frontend framework like React, Angular, Vue etc.

1. To start with, add the script in root html to load web component.

```html
<head>
  <meta charset="UTF-8" />
  <script src="~/node_modules/blur-progressive-image"></script>
</head>
```

2. Use the web-component in the desired place

```html
<progressive-image
  src="https://link.to/original/image"
  thumbnail="https://link.to/full/image"
/>
```

## Properties

| Property    | Description            | Default |
| ----------- | ---------------------- | ------- |
| `src`       | Full size image source | `""`    |
| `thumbnail` | Thumbnail of image     | `""`    |
| `blur`      | Blur Amount            | `12`    |
