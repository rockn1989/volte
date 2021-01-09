import gulpCollector from "gulp";

import twig from "gulp-twig";
import sync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import stylelint from "gulp-stylelint";
import prettyHtml from "gulp-pretty-html";
import gcmq from "gulp-group-css-media-queries";
import sass from "gulp-sass";
import rename from "gulp-rename";
import copy from "gulp-copy";
import clean from "gulp-clean";
import del from "del";
import imageMin from "gulp-imagemin";
import svgstore from "gulp-svgstore";
import minify from "gulp-csso";
import change from "gulp-changed";
import plumber from "gulp-plumber";
import eslint from "gulp-eslint";

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
	rename,
	clean,
	copy,
	del,
	imageMin,
	svgstore,
	minify,
	change,
	eslint,
  plumber
};
