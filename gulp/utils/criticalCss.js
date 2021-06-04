import { gulp, clean, critical } from "../gulp.common.js";

/**
 * Critical css
 */
const criticalCss = () => {
  return critical.generate({
    inline: true,
    base: "build/",
    src: "index.html",
    minify: true,
    target: {
      html: "index.html",
      uncritical: "/css/style.min.css",
    },
    width: 320,
    height: 480,
  });
};

/**
 * Clean folder
 */
const cleanFolder = () => {
  return gulp
    .src("./build/*.html", { allowEmpty: true })
    .pipe(clean({ read: false }));
};

cleanFolder();
criticalCss();
