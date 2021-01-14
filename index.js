var textract = require("./lib");
textract.fromUrl(
  "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx",
  function (error, text) {
    console.log(text[1]);
  }
);
