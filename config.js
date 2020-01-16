const path = require("path");
const proxyMiddleware = require("http-proxy-middleware");

function resolveNodeModules(dir) {
  return path.join(__dirname, "./node_modules/", dir);
}

function resolveDev(dir) {
  return path.join(__dirname, "./src/", dir);
}

function resolveBuild(dir) {
  return path.join(__dirname, "./dist/", dir);
}
module.exports = {
  dev: {
    base: resolveDev(""),
    node_modules: resolveNodeModules,
    static: "static/**/*",
    html: resolveDev("pages/*.html"),
    allhtml: resolveDev("/**/*.html"),
    css: resolveDev("styles/**/*.css"),
    sass: resolveDev("styles/**/*.scss"),
    script: resolveDev("js/**/*.js"),
    images: resolveDev("static/images/**/*.{png,jpg,gif,svg}")
  },

  build: {
    base: resolveBuild(""),
    static: resolveBuild("static"),
    html: resolveBuild(""),
    css: resolveBuild("styles"),
    css_vendors: resolveBuild("css/vendors"),
    script: resolveBuild("js"),
    script_vendors: resolveBuild("js/vendors"),
    images: resolveBuild("static/images")
  },
  proxyMiddleware: proxyMiddleware("/api", {
    target: "http://localhost:8080",
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    },
    logLevel: "debug"
  })
};
