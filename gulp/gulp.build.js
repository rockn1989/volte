import {
  gulp,
  sass,
  sourceMap,
  plumber,
  babel,
  uglify,
  useref,
  concat,
  prettyHtml,
  autoprefixer,
  rename,
  clean,
  imageMin,
  minify,
  gcmq,
} from "./gulp.common.js";

/**
 * Styles
 */
export const scss = () => {
  return gulp
    .src("assets/scss/main.scss")
    .pipe(plumber())
    .pipe(sourceMap.init())
    .pipe(sass())
    .pipe(sourceMap.write({ addComment: false }))
    .pipe(rename("style.css"))
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(gulp.dest("build/css"));
};

/**
 * Minify css
 */
export const cssMin = () => {
  return gulp
    .src("build/css/style.css")
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
};

/**
 * Pretty css
 */
export const prettyCss = () => {
  return gulp
    .src("./build/css/style.css")
    .pipe(gcmq())
    .pipe(gulp.dest("./build/css"));
};

/**
 * JS
 */
export const js = () => {
  return gulp
    .src("build/js/bundle.min.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(rename("bundle.min.js"))
    .pipe(gulp.dest("build/js/"));
};

export const concatJs = () => {
  return gulp.src("build/*.html").pipe(useref()).pipe(gulp.dest("build/"));
};

/**
 * Pretty Html
 */
export const prettyHTML = () => {
  return gulp
    .src("./dist/*.html")
    .pipe(
      prettyHtml({
        indent_size: 2,
        indent_char: " ",
        unformatted: ["code", "pre", "em", "strong", "span", "i", "b", "br"],
      })
    )
    .pipe(gulp.dest("./build"));
};

/**
 * Copy Files
 */
export const copyFiles = () => {
  return gulp
    .src(
      [
        "dist/fonts/**/*.{woff,woff2}",
        "dist/img/**",
        "dist/js/**",
        "dist/css/**",
        "dist/libs/**",
      ],
      {
        base: "./dist",
      }
    )
    .pipe(gulp.dest("./build"));
};

/**
 * Clean folder
 */
export const cleanFolder = () => {
  return gulp.src("./build", { allowEmpty: true }).pipe(clean({ read: false }));
};

/**
 * Minify images
 */
export const imagesMin = () => {
  return gulp
    .src("build/img/**/*.{png,jpg,gif}")
    .pipe(
      imageMin([
        imageMin.optipng({ optimizationLevel: 3 }),
        imageMin.mozjpeg({ quality: 75, progressive: true }),
      ])
    )
    .pipe(gulp.dest("build/img"));
};

const build = gulp.series(
  cleanFolder,
  gulp.series(
    copyFiles,
    scss,
    prettyCss,
    cssMin,
    imagesMin,
    prettyHTML,
    concatJs,
    js
  )
);

export default build;
