const gulp = require("gulp");
const autoprefix = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const del = require("del");
const fileinclude = require("gulp-file-include");
const imagemin = require("gulp-imagemin");
const eslint = require("gulp-eslint");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const config = require("./config");

gulp.task("browserSync", cb => {
  browserSync({
    server: {
      baseDir: ["./dist/"]
    },
    port: 3000
  });
});

/**
 * 开发模式 js任务
 */
gulp.task("js", cb => {
  return (
    gulp
      .src(config.dev.script)
      // .pipe(uglify())
      .pipe(eslint())
      .pipe(
        babel({
          presets: ["@babel/preset-env"]
        })
      )
      .pipe(gulp.dest(config.build.script))
      .pipe(
        reload({
          stream: true
        })
      )
    // .pipe(notify({ message: "js task ok" }))
  );
});

/**
 * 开发模式 js任务
 * 增加了uglify步骤
 */
gulp.task("buildJs", cb => {
  return gulp
    .src(config.dev.script)
    .pipe(eslint())
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify({ mangle: true })) //代码压缩
    .pipe(gulp.dest(config.build.script))
    .pipe(
      reload({
        stream: true
      })
    );
  // .pipe(notify({ message: "build js task ok" }));
});

const sassStyle = () => {
  return gulp
    .src(["./css/*.sass", "!./css/_*.sass"])
    .pipe(sass())
    .pipe(
      autoprefix({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(cleanCSS()) //css压缩
    .pipe(gulp.dest("./dist/css/"))
    .pipe(
      reload({
        stream: true
      })
    );
  // .pipe(notify({ message: "sassStyle task ok" }));
};
const cssStyle = () => {
  return gulp
    .src(config.dev.css)
    .pipe(cleanCSS()) //css压缩
    .pipe(gulp.dest(config.build.css))
    .pipe(
      reload({
        stream: true
      })
    );
  // .pipe(notify({ message: "cssStyle task ok" }));
};
gulp.task("sass", gulp.series(cssStyle, sassStyle));

gulp.task("html", () => {
  return gulp
    .src(config.dev.html)
    .pipe(
      fileinclude({
        prefix: "@@",
        indent: true, //保留文件的缩进
        basepath: "./src/template"
      })
    )
    .pipe(gulp.dest(config.build.html))
    .pipe(
      reload({
        stream: true
      })
    );
  // .pipe(notify({ message: "html task ok" }));
});
gulp.task("img", () => {
  return gulp
    .src(config.dev.images)
    .pipe(imagemin()) //图片压缩
    .pipe(gulp.dest(config.build.images))
    .pipe(
      reload({
        stream: true
      })
    );
  // .pipe(notify({ message: "image task ok" }));
});

gulp.task("watch", cb => {
  gulp.watch(config.dev.script, gulp.series("js"), reload);
  gulp.watch(config.dev.css, gulp.series("sass"), reload);
  gulp.watch(config.dev.images, gulp.series("img"), reload);
  gulp.watch(
    [config.dev.html, "./src/template/*.html"],
    gulp.series("html"),
    reload
  );
  cb();
});

gulp.task("clean", cb => {
  return del(["dist/css/", "dist/js/", "dist/page/*.html", "dist/static"]);
});

gulp.task("build", gulp.series("clean", "html", "sass", "buildJs", "img"));

gulp.task(
  "default",
  gulp.series("clean", "sass", "js", "img", "html", "watch", "browserSync")
);
