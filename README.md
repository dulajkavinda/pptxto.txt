# pptxto.txt

A text extraction node module, thtat can convert pptx and ppt file formats into pure text.

[![NPM](https://nodei.co/npm/pptxto.txt.png?compact=true)](https://nodei.co/npm/pptxto.txt/)

## Install

```bash
npm i pptxto.txt
```
## Extraction Requirements

Note, if any of the requirements below are missing, textract will run and extract all files for types it is capable.  Not having these items installed does not prevent you from using textract, it just prevents you from extracting those specific files.

* `PDF` extraction requires `pdftotext` be installed, [link](http://www.foolabs.com/xpdf/download.html)
* `DOC` extraction requires `antiword` be installed, [link](http://www.winfield.demon.nl/), unless on OSX in which case textutil (installed by default) is used.
* `RTF` extraction requires `unrtf` be installed, [link](https://www.gnu.org/software/unrtf/), unless on OSX in which case textutil (installed by default) is used.

## Usage

#### Import

```javascript
var pptxtotxt = require('pptxto.txt');
```

#### APIs

##### URL

When passing a URL, the URL can either be a string, or a [node.js URL object](https://nodejs.org/api/url.html). Using the URL object allows fine grained control over the URL being used.

```javascript
pptxtotxt.fromUrl(url, function( error, text ) {})
```

```javascript
pptxtotxt.fromUrl(url, config, function( error, text ) {})
```
As the result you will recieve a array, which includes all the extracted text from the pptx. You can access each slide by specifying the index of the result array.

## License

[MIT](https://github.com/dulajkavinda/pptxto.txt/blob/master/LICENSE)
