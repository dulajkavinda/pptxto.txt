# 📄 pptxto.txt

A text extraction node module, thtat can convert pptx and ppt file formats into pure text.

[![NPM](https://nodei.co/npm/pptxto.txt.png?compact=true)](https://nodei.co/npm/pptxto.txt/)

[![version](https://img.shields.io/npm/v/pptxto.txt.svg)](https://www.npmjs.org/package/pptxto.txt)
[![downloads](https://img.shields.io/npm/dt/pptxto.txt.svg)](https://www.npmjs.org/package/pptxto.txt)

## Install

```bash
npm i pptxto.txt
```

## Usage

#### Import

```javascript
var pptxtotxt = require("pptxto.txt");
```

#### APIs

##### URL

When passing a URL, the URL can either be a string, or a [node.js URL object](https://nodejs.org/api/url.html). Using the URL object allows fine grained control over the URL being used.

```javascript
pptxtotxt.fromUrl(url, function (error, text) {});
```

```javascript
pptxtotxt.fromUrl(url, config, function (error, text) {});
```

As the result you will recieve a array, which includes all the extracted text from the pptx. You can access each slide by specifying the index of the result array.

## License

[MIT](https://github.com/dulajkavinda/pptxto.txt/blob/master/LICENSE)
