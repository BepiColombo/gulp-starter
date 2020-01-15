const path = require("path");

function resolveDev(dir) {
  return path.join(__dirname, "./src/", dir);
}

function resolveBuild(dir) {
  return path.join(__dirname, "./dist/", dir);
}
module.exports = {
  dev: {
    static: "static/**/*",
    html: resolveDev("pages/*.html"),
    allhtml: resolveDev("/**/*.html"),
    css: resolveDev("styles/**/*.{scss,css}"),
    script: resolveDev("js/*.js"),
    images: resolveDev("static/images/**/*.{png,jpg,gif,svg}")
  },

  build: {
    static: resolveBuild("static"),
    html: resolveBuild(""),
    css: resolveBuild("styles"),
    script: resolveBuild("js"),
    images: resolveBuild("static/images")
  }
};
