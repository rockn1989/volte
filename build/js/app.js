(function () {
  console.log("App start");

  /**
   * Object-fit polyfill
   */
  if (typeof objectFitImages === "function") {
    objectFitImages();
  }

  /**
   * Svg4everybody
   */
  svg4everybody();
})();
