import { gulp, clean, webp } from "../gulp.common.js";

/**
 * Convert img to webp
 */
const webpConvert = () => {
  return gulp
    .src("./assets/img/webp/*.{png,jpg,gif}")
    .pipe(webp())
    .pipe(gulp.dest("./dist/img/webp/"));
};

/**
 * Clean folder
 */
const cleanFolder = () => {
  return gulp
    .src("./dist/img/webp", { allowEmpty: true })
    .pipe(clean({ read: false }));
};

cleanFolder();
webpConvert();
