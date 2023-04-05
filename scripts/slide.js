class Slide {
  width;
  height;
  borders;
  borderChar;
  backgroundChar = " ";
  slide;

  constructor({
    slide = "",
    width = 100,
    height = 20,
    borders = [0, 0, 0, 0],
    borderWidth = -1,
    borderChar = "#",
  }) {
    if (slide.length > 0) {
      this.slide = slide;

      var dimensions = getStringDimensions(slide);
      this.width = dimensions[0];
      this.height = dimensions[1] - 1;
    } else {
      this.width = width;
      this.height = height;
      this.borderChar = borderChar;
      if (borderWidth > 0) {
        this.borders = Array(4).fill(borderWidth);
      } else {
        this.borders = borders;
      }
      this.slide = this.drawEmptyBox(width, height, borderChar, this.borders);
    }
  }

  drawEmptyBox(width, height, borderChar, borders) {
    var sb = "";
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        if (y < borders[0]) {
          sb += borderChar;
          continue;
        }
        if (height - y <= borders[2]) {
          sb += borderChar;
          continue;
        }
        if (x < borders[3]) {
          sb += borderChar;
          continue;
        }
        if (width - x <= borders[1]) {
          sb += borderChar;
          continue;
        }
        sb += this.backgroundChar;
      }
      sb += "\n";
    }
    return sb;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getBorders() {
    return this.borders;
  }

  getSlide() {
    return this.slide;
  }

  replaceAt(position, text) {
    position = Math.floor(position);
    var begin = this.slide.slice(0, position);
    var end = this.slide.slice(position + text.length);

    return begin + text + end;
  }

  drawText({ x, y, text, borders, align = "l", newLine = 0 }) {
    x = Math.floor(x);
    y = Math.floor(y);

    if (!Array.isArray(borders)) {
      borders = isNaN(borders) ? Array(4).fill(0) : Array(4).fill(borders);
    }

    text.split("\n").forEach((line, index) => {
      // Convert coordinates to string position
      var position = y * (this.width + 1) + x;

      // Move position based on left | center | right alignment
      if (align == "c") position -= line.length / 2;
      if (align == "r") position -= line.length;

      this.slide = this.replaceAt(position, line);
      y++;
    });
    return newLine;
  }

  drawBox({
    x,
    y,
    text,
    boxWidth,
    boxHeight,
    borderValue = "#",
    borders,
    align = "l",
  }) {
    x = Math.floor(x);
    y = Math.floor(y);
    var borderArray;
    if (Array.isArray(borders)) {
      // Fill border array
      borderArray = borders;
    } else {
      borderArray = Array(4).fill(borders);
    }

    // Use background box drawer to draw box
    var box = this.drawEmptyBox(boxWidth, boxHeight, borderValue, borderArray);

    var height = y;
    box.split("\n").forEach((boxLine) => {
      // Set the position of the box
      var position = height * (this.width + 1) + x;
      if (align == "c") position -= boxWidth / 2;
      if (align == "r") position -= boxWidth;

      // Replace line by line
      this.slide = this.replaceAt(position, boxLine);
      height++;
    });
    y += borderArray[0];
    if (align == "l") x += borderArray[3];
    if (align == "r") x -= borderArray[1];
    // Draw optional text inside box
    this.drawText({ x, y, text, borders: borderArray, align });
  }

  drawLine({ x, y, length, lineChar = "-", isHorizontal = true, align = "l" }) {
    x = Math.floor(x);
    y = Math.floor(y);
    // Set position of line
    var position = y * (this.width + 1) + x;
    if (align == "c") position -= length / 2;
    if (align == "r") position -= length;

    // Horizontal or vertical line
    if (isHorizontal) {
      this.slide = this.replaceAt(position, lineChar.repeat(length));
    } else {
      for (var i = 0; i < length; i++) {
        position = (y + i) * (this.width + 1) + x;
        this.slide = this.replaceAt(position, lineChar);
      }
    }
  }

  drawList({ list, x, y, isOrdered = true, bullet = "*" }) {
    x = Math.floor(x);
    y = Math.floor(y);
    var horizontalOffset = 0;
    var prefix = bullet + " ";
    for (var i = 0; i < list.length; i++) {
      if (isOrdered) {
        prefix = i + 1 + ". ";
      }
      horizontalOffset += this.drawText({
        x: x,
        y: y + i + horizontalOffset,
        text: prefix + list.at(i),
        borders: 1,
        align: "l",
      });
    }
  }

  drawASCIIImg({ x, y, imgPath, align = "l", vertAlign = false }) {
    x = Math.floor(x);
    y = Math.floor(y);
    var img = imgPath;

    // Get the dimensions of the image
    var dimensions = getStringDimensions(img);

    if (align == "c") x = x - dimensions[0] / 2;
    if (align == "r") x = x - dimensions[0];
    if (vertAlign) y = y - dimensions[1] / 2;

    // Check each line breaking character
    img.split("\n").forEach((line, heightIndex) => {
      // Stop if the image is too large
      if (!(y + heightIndex > this.height - this.borders[2])) {
        this.drawText({ x: x, y: y + heightIndex, text: line, borders: 0 });
      }
    });
  }
}
