var xpath = require("xpath"),
  Dom = require("xmldom").DOMParser,
  yauzl = require("yauzl"),
  util = require("../util"),
  slideMatch = /^ppt\/slides\/slide/;

function _compareSlides(a, b) {
  if (a.slide < b.slide) {
    return -1;
  }
  if (a.slide > b.slide) {
    return 1;
  }
  return 0;
}

function _calculateExtractedText(slideText) {
  var doc = new Dom().parseFromString(slideText),
    ps = xpath.select("//*[local-name()='p']", doc),
    text = "";
  ps.forEach(function (paragraph) {
    var ts,
      localText = "";
    paragraph = new Dom().parseFromString(paragraph.toString());

    ts = xpath.select(
      "//*[local-name()='t' or local-name()='tab' or local-name()='br']",
      paragraph
    );

    ts.forEach(function (t) {
      if (t.localName === "t" && t.childNodes.length > 0) {
        localText += t.childNodes[0].data;
      } else {
        if (t.localName === "tab" || t.localName === "br") {
          localText += "";
        }
      }
    });

    text += localText + "\n";
  });

  return text;
}

function extractText(filePath, options, cb) {
  var slides = [];
  let resutlArray = [];
  yauzl.open(filePath, function (err, zipfile) {
    if (err) {
      util.yauzlError(err, cb);
      return;
    }

    zipfile.on("end", function () {
      var slidesText, text;
      if (slides.length) {
        slides.sort(_compareSlides);
        slidesText = slides
          .map(function (slide, index) {
            text = _calculateExtractedText(slide.text);
            resutlArray.push(text);

            return slide.text;
          })
          .join("\n");
        text = _calculateExtractedText(slidesText);

        cb(null, resutlArray);
      } else {
        cb(
          new Error(
            "Extraction could not find slides in file, are you" +
              " sure it is the mime type it says it is?"
          ),
          null
        );
      }
    });

    zipfile.on("entry", function (entry) {
      if (slideMatch.test(entry.fileName)) {
        util.getTextFromZipFile(zipfile, entry, function (err2, text) {
          var slide = +entry.fileName
            .replace("ppt/slides/slide", "")
            .replace(".xml", "");
          slides.push({ slide: slide, text: text });
        });
      }
    });

    zipfile.on("error", function (err3) {
      cb(err3);
    });
  });
}
module.exports = {
  types: [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.template",
  ],
  extract: extractText,
};
