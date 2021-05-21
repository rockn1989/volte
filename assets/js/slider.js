class Slider {
  constructor(className) {
    this.slider = document.querySelector(className);
    this.slides = this.slider.querySelectorAll(".slide");
    this.currentSlide = this.slider.querySelector(".slide-current");
    this.currentImgBox = this.slider.querySelector(".slider__current-img");
    this.currentImg = this.currentSlide.querySelector("img");
    this.arrow = this.slider.querySelector(".slider__arrow");
  }

  onHandleCheckActiveSlide() {
    this.slider.addEventListener("click", (evt) => {
      let evtTarget = evt.target.closest(".slide");
      if (evtTarget && !evtTarget.classList.contains("slide-current")) {
        [...this.slides].forEach((slide) =>
          slide.classList.remove("slide-current")
        );
        evtTarget.classList.add("slide-current");
        this.currentImg = evtTarget.querySelector("img");
        this.onHandleChangeCurrentImg(this.currentImg);
      }
    });
  }

  onInit() {
    this.onHandleSetCurrentImg();
    this.onHandleCheckActiveSlide();
    this.onHandleToggleSlides();
  }

  onHandleSetCurrentImg() {
    this.currentImgBox.style.backgroundImage = `url(${this.currentImg.src})`;
  }

  onHandleChangeCurrentImg(img) {
    this.currentImgBox.classList.add("fadeIn");
    const newImg = new Image();
    newImg.src = img.src;

    newImg.addEventListener("load", (e) => {
      e.preventDefault();
      this.currentImgBox.addEventListener("transitionend", () => {
        this.currentImgBox.style.backgroundImage = `url(${img.src})`;
        this.currentImgBox.classList.remove("fadeIn");
      });
    });
  }

  onHandleToggleSlides() {
    this.arrow.addEventListener("click", (e) => {
      e.preventDefault();
      let currentSlideIdx = 0;
      [...this.slides].forEach((slide, idx) => {
        if (slide.classList.contains("slide-current")) {
          currentSlideIdx = idx;
          slide.classList.remove("slide-current");
        }
      });
      if (!this.slides[currentSlideIdx + 1]) {
        currentSlideIdx = 0;
        this.currentImg = this.slides[currentSlideIdx].querySelector("img");
        this.slides[currentSlideIdx].classList.add("slide-current");
      } else {
        this.currentImg = this.slides[currentSlideIdx + 1].querySelector("img");
        this.slides[currentSlideIdx + 1].classList.add("slide-current");
      }
      this.onHandleChangeCurrentImg(this.currentImg);
    });
  }
}

const slider = new Slider(".slider");
slider.onInit();
