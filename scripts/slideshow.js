class SlideShow {
  width;
  height;
  slideShow;
  slideShowSpace;

  constructor({
    path = "",
    width = 100,
    height = 20,
    slideShowSpace = 4,
    jsonString = "",
  }) {
    this.width = width;
    this.height = height;
    this.slideShowSpace = slideShowSpace;
    this.slideShow = {
      slides: [],
      config: [this.width, this.height, 0, this.slideShowSpace],
    };

    if (jsonString.length > 0) {
      this.slideShow = JSON.parse(jsonString);
      this.width = this.slideShow.config[0];
      this.height = this.slideShow.config[1];
      this.slideShowSpace = this.slideShow.config[3];
    }

    if (path.length > 0) {
      // Get the slideshow string and find the config line
      var stringSlides = getStringFromPath(path);
      var configArray = lastLine(stringSlides).split(",");

      // Set the info
      this.width = Number(configArray[0]);
      this.height = Number(configArray[1]);
      this.slideShowSpace = Number(configArray[3]);

      // Check valid slidehow
      var dimensions = getStringDimensions(stringSlides);
      // Empty slideshow
      if (this.height == 1) return;

      if (
        this.width + 1 != dimensions[0] ||
        (this.height + this.slideShowSpace) * Number(configArray[2]) + 1 !=
          dimensions[1]
      ) {
        console.error("Error! Does not recognize " + path);
        return;
      }

      // Generate the slideshow from the individual slides
      var position;
      for (var i = 0; i < Number(configArray[2]); i++) {
        position =
          (this.width * this.height + this.height) * i +
          this.slideShowSpace * i;
        var s = Slide(
          stringSlides.splice(position, this.width * this.height + height)
        );
        this.updateSlideshow(s);
      }
    }
  }

  lastLine(input) {
    if (input.length == 1) return input;
    var list = input.split("\n");
    return list[list.length - 1];
  }

  getSlideShow() {
    var slideShowString = "";
    for (var i = 0; i < this.slideShow.slides.length; i++) {
      slideShowString += this.executeCommands(
        this.slideShow.slides[i]
      ).getSlide();
      slideShowString += "\n".repeat(this.slideShowSpace);
    }
    slideShowString +=
      this.width +
      "," +
      this.height +
      "," +
      this.slideShow.slides.length +
      "," +
      this.slideShowSpace;
    return slideShowString;
  }

  executeCommands(slideInput) {
    var s = new Slide(slideInput.init);
    slideInput.commands.forEach((command) => {
      s[command.name](command.params);
    });
    return s;
  }

  getSlide(index) {
    return this.executeCommands(this.slideShow.slides[index]);
  }

  updateSlideshow(slide, index = -1) {
    if (index > 0) {
      this.slideShow.slides.splice(index, 0, slide);
    } else {
      this.slideShow.slides.push(slide);
    }
  }

  removeSlide(index) {
    if (index < this.slideShow.slides.length) {
      this.slideShow.slides.splice(index, 1);
    } else {
      console.error("Out of bounds!");
    }
  }

  swapSlides(firstIndex, secondIndex) {
    const isTopSlide = secondIndex < 0;
    const isLastSlide = secondIndex >= this.slideShow.slides.length;
    if (!isTopSlide && !isLastSlide) {
      const temp = this.slideShow.slides[firstIndex];
      this.slideShow.slides[firstIndex] = this.slideShow.slides[secondIndex];
      this.slideShow.slides[secondIndex] = temp;
    } else {
      console.error("Out of bounds!");
    }
  }
}
