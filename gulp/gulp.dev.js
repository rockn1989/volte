import {
  gulp,
  twig,
  sync,
  autoprefixer,
  sass,
  stylelint,
  del,
  svgstore,
  prettyHtml,
  rename,
  clean,
  change,
  eslint,
  plumber,
  sourceMap
} from "./gulp.common.js";

/**
 * Server
 */
export const browserServer = () => {
  sync.init({
    server: {
      baseDir: "./dist",
    },
    notify: false,
  });
};

/**
 * Watcher
 */
export const watch = () => {
  gulp.watch("assets/scss/**/*.scss", gulp.series(scss, styleLinting));
  gulp.watch("assets/**/*.js", gulp.series(js));
  gulp.watch("assets/templates/**/*.twig", gulp.series(template));
  gulp.watch(
    ["assets/img/**/*", "!./assets/img/webp/*.{png, jpg, gif}"],
    gulp.series(template, copyImages)
  );
  gulp.watch(
    "assets/img/icon-svg/*.svg",
    gulp.series(removeSvgSprite, svgStore)
  );
};

/**
 * Twig template
 */
export const template = () => {
  return gulp
    .src("assets/templates/pages/*.twig")
    .pipe(change("assets", { extension: ".twig" }))
    .pipe(twig())
    .pipe(gulp.dest("dist/"))
    .pipe(sync.stream());
};

/**
 * Styles
 */
export const scss = () => {
  return gulp
    .src("assets/scss/main.scss")
    .pipe(plumber())
    .pipe(sourceMap.init())
    .pipe(sass())
    .pipe(sourceMap.write())
    .pipe(rename("style.css"))
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(sync.stream());
};

/**
 * JS
 */
export const js = () => {
  return gulp
    .src("assets/js/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest("dist/js/"))
    .pipe(sync.stream());
};

/**
 * Img
 */
export const img = () => {
  return gulp
    .src("assets/img/**/**.{png,jpg,gif}")
    .pipe(cache("images"))
    .pipe(gulp.dest("dist/img/"))
    .pipe(sync.stream());
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
    .pipe(gulp.dest("./dist"));
};

/**
 * Copy files
 */
export const copyFiles = () => {
  return gulp
    .src(
      [
        "assets/fonts/**/*.{woff,woff2}",
        "assets/img/**",
        "assets/js/**",
        "assets/libs/**",
      ],
      {
        base: "./assets",
      }
    )
    .pipe(gulp.dest("./dist"));
};

/**
 * Copy img
 */
export const copyImages = () => {
  return gulp
    .src(["assets/img/**"], {
      base: "./assets",
    })

    .pipe(gulp.dest("./dist"))
    .pipe(sync.stream());
};

/**
 * Remove svg-sprite
 */
export const removeSvgSprite = () => {
  return del("dist/img/icon-svg/sprite/sprite-svg.svg");
};

/**
 * Svg-sprite
 */
export const svgStore = () => {
  return gulp
    .src("assets/img/icon-svg/*.svg")
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("assets/img/icon-svg/sprite/"));
};

/**
 * Clean folder
 */
export const cleanFolder = () => {
  return gulp.src("./dist", { allowEmpty: true }).pipe(clean({ read: false }));
};

/**
 * Style linting
 */
const styleLinting = () => {
  return gulp
    .src("assets/scss/**/*.scss")
    .pipe(
      plumber({
        errorHandler: (err) => {
          console.log(err.plugin);
        },
      })
    )
    .pipe(
      stylelint({
        reporters: [
          {
            formatter: "string",
            fix: true,
            failAfterError: true,
            console: true,
          },
        ],
      })
    );
};

const start = gulp.series(
  cleanFolder,
  gulp.parallel(
    template,
    scss,
    styleLinting,
    copyFiles,
    removeSvgSprite,
    svgStore
  ),
  gulp.parallel(browserServer, watch)
);

export default start;
