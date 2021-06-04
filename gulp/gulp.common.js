/**
 * Base plugins
 */
import gulpCollector from "gulp";
import sync from "browser-sync";
import rename from "gulp-rename";
import copy from "gulp-copy";
import clean from "gulp-clean";
import del from "del";
import change from "gulp-changed";
import plumber from "gulp-plumber";

/**
 * Html plugins
 */
import twig from "gulp-twig";
import prettyHtml from "gulp-pretty-html";

/**
 * Styles plugins
 */
import sass from "gulp-sass";
import gcmq from "gulp-group-css-media-queries";
import minify from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";
import critical from "critical";

/**
 * JS plugins
 */
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import useref from "gulp-useref";
import concat from "gulp-concat";

/**
 * Images plugins
 */
import svgstore from "gulp-svgstore";
import imageMin from "gulp-imagemin";
import webp from "gulp-webp";

/**
 * Linters plugins
 */
import eslint from "gulp-eslint";
import stylelint from "gulp-stylelint";

/**
 * Source map
 */
import sourceMap from "gulp-sourcemaps";

const gulp = gulpCollector;

export {
  gulp,
  twig,
  sync,
  autoprefixer,
  prettyHtml,
  gcmq,
  sass,
  stylelint,
  critical,
  babel,
  uglify,
  useref,
  concat,
  rename,
  clean,
  copy,
  del,
  imageMin,
  webp,
  svgstore,
  minify,
  change,
  eslint,
  plumber,
  sourceMap,
};
