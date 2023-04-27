// START INIT

var slideShowObject = new SlideShow({
  width: 100,
  height: 20,
  slideShowSpace: 2,
});

if (window.localStorage.getItem("slideshow") !== null) {
  slideShowObject = new SlideShow({
    jsonString: window.localStorage.getItem("slideshow"),
  });
} else {
  createSlide();
}

let seenGuide = window.localStorage.getItem("seenGuide") === "true";

updateSlideshowSite(false, true);

selected(window.location.href);
updateEditor(window.location.href);
var globalCleanTimeout;

var latestStoredZoom = window.localStorage.getItem("latestZoom");
if (latestStoredZoom !== null) {
  document.getElementById("slide-test").style.fontSize = latestStoredZoom;
} else {
  document.getElementById("slide-test").style.fontSize = isMobile
    ? "2.5em"
    : "1em";
}
zoom(true, 0);

window.addEventListener("hashchange", function (event) {
  selected(event.newURL);
  updateEditor(event.newURL);
  if (isMobile) {
    setCurrentSelected(1);
  }
});

document.onkeydown = function (e) {
  e = e || window.event;
  if (e.ctrlKey && e.key === "s") {
    save();
    e.preventDefault();
  }
};

// STOP INIT

function updateSlideshowSite(
  isNew = false,
  rewriteAll = false,
  refreshAllSlides = false
) {
  const index = getCurrentIndex(window.location.href) - 1;
  const parent = document.getElementsByClassName("slideList")[0];
  if (rewriteAll) {
    for (var i = parent.children.length - 2; i >= 0; i--) {
      parent.removeChild(parent.children[i]);
    }
  }

  slideShowObject.slideShow.slides.forEach((slide, slideIndex) => {
    if (slide.init && (slideIndex === index || refreshAllSlides)) {
      const tempInit = slide.init;
      tempInit.width = Number(slideShowObject.slideShow.config[0]);
      tempInit.height = Number(slideShowObject.slideShow.config[1]);
      var s = new Slide(tempInit);
      slide.commands.forEach((command) => {
        s[command.name](command.params);
        if (rewriteAll) updateEditor(window.location.href);
      });
    }
    const createButton = document.getElementById("createSlideButton");
    if (rewriteAll)
      parent.insertBefore(getNewSlideElement(slideIndex), createButton);
  });

  if (isNew) {
    window.location.href = "#" + (parent.children.length - 1);
  } else {
    selected(window.location.href);
  }
  document.getElementById("slide-test").innerHTML =
    slideShowObject.getSlideShow();

  for (var i = 0; i < 3; i++) {
    if (i === 2) {
      document.getElementsByClassName("configEditor")[i].value =
        slideShowObject.slideShow.config[i + 1];
      break;
    }
    document.getElementsByClassName("configEditor")[i].value =
      slideShowObject.slideShow.config[i];
  }
}

function createSlide() {
  var index = slideShowObject.slideShow.slides.length;

  slideShowObject.slideShow.slides[index] = {
    init: {
      width: slideShowObject.slideShow.config[0],
      height: slideShowObject.slideShow.config[1],
      borders: [1, 1, 1, 1],
      borderChar: "#",
    },
    commands: [
      {
        name: "drawText",
        params: commandNameStandardParams("drawText"),
      },
    ],
  };
  updateSlideshowSite(true, true);
}

function save() {
  const element = document.getElementById("saveButton");
  element.innerHTML = "&#10227;";
  window.localStorage.setItem(
    "slideshow",
    JSON.stringify(slideShowObject.slideShow)
  );
  setTimeout(() => {
    element.innerHTML = "&#128190;";
  }, 400);
}

function download() {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," +
      encodeURIComponent(slideShowObject.getSlideShow())
  );
  element.setAttribute("download", "schlideshow.txt");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function zoom(direction, incVal = 0.1) {
  var currentVal = Number(
    document.getElementById("slide-test").style.fontSize.split("em")[0]
  );
  currentVal = direction ? (currentVal += incVal) : (currentVal -= incVal);
  document.getElementById("slide-test").style.fontSize = currentVal + "em";

  window.localStorage.setItem(
    "latestZoom",
    document.getElementById("slide-test").style.fontSize
  );

  document.getElementById("zoom-val").innerHTML =
    Math.round(currentVal * 100) + "%";
}

function removeSlide(index) {
  slideShowObject.removeSlide(index);
  updateSlideshowSite(false, true);
}

function swapSlides(index, dir) {
  slideShowObject.swapSlides(index, index + dir);
  updateSlideshowSite(false, true);
}

function addCommand(slideIndex, cmdIndex, commandInput, forceX, forceY) {
  const newCommand = {
    name: commandInput,
    params: commandNameStandardParams(commandInput),
  };
  if (forceX != "undefined") newCommand.params.x = forceX;
  if (forceY != "undefined") newCommand.params.y = forceY;
  slideShowObject.slideShow.slides[slideIndex].commands.splice(
    cmdIndex + 1,
    0,
    newCommand
  );
  cleanDynamicBubbles();
  updateSlideshowSite(false, true);
}

function updateEditor(url) {
  const index = getCurrentIndex(url);

  document.getElementById("currentSlideTitle").innerText =
    "Current slide: " + index;
  document.getElementById("borderEditor").innerHTML =
    '<span id="borderTitle">Border</span>';

  document.getElementById("slideEditor").innerHTML = "";

  if (index > slideShowObject.slideShow.slides.length) return;
  document
    .getElementById("borderEditor")
    .appendChild(getBorderEditor(index - 1));
  slideShowObject.slideShow.slides[index - 1].commands.forEach(
    (command, cmdIndex) => {
      document
        .getElementById("slideEditor")
        .appendChild(commandNameDrawer(command.name)(index - 1, cmdIndex));
    }
  );
}

function selected(url) {
  const urlSplitter = url.split("#");
  const index = urlSplitter[urlSplitter.length - 1];
  const slides = document.getElementsByClassName("slideListItems");
  if (isNaN(index)) {
    slides[0].className = "slideListItems selectedListItem";
    return;
  }

  for (var i = 0; i < slides.length; i++) {
    if (i + 1 === Number(index)) {
      slides[i].className = "slideListItems selectedListItem";
    } else {
      slides[i].className = "slideListItems";
      if(slides[i].id === "createSlideButton") {
        slides[i].className += " guideClassNameClarence";
      }
    }
  }
}

function dynamicPosition(event) {
  if (isMobile) return;
  cleanDynamicBubbles();
  if (!event.ctrlKey) return;
  const fontWidth = parseFloat(getComputedStyle(event.srcElement).fontSize);
  const xPosition = event.clientX - event.srcElement.getBoundingClientRect().x;
  const yPosition = event.clientY - event.srcElement.getBoundingClientRect().y;
  const slideHeight = slideShowObject.slideShow.config[1];
  const slideSpace = slideShowObject.slideShow.config[3];

  const insaneX = Math.ceil((xPosition / (fontWidth / 2)) * 0.92) - 1;
  const insaneY = Math.ceil((yPosition / fontWidth) * 0.889) - 1;
  const slideClicked = Math.trunc(
    insaneY / (Number(slideHeight) + Number(slideSpace) + 1)
  );

  placeDiv(
    event.clientX,
    event.clientY,
    slideClicked,
    insaneX,
    insaneY % (Number(slideHeight) + Number(slideSpace) + 1)
  );
}

function placeDiv(xPos, yPos, slideIndex, commandX, commandY) {
  var dynamicPlacerBubble = document.createElement("div");
  dynamicPlacerBubble.className = "dynamicPlacerBubble";
  dynamicPlacerBubble.style.left = xPos + "px";
  dynamicPlacerBubble.style.top = yPos + "px";
  dynamicPlacerBubble.appendChild(
    getCardAdderButton(
      slideIndex,
      slideShowObject.slideShow.slides[slideIndex].commands.length - 1,
      commandX,
      commandY
    )
  );

  document.body.appendChild(dynamicPlacerBubble);
  globalCleanTimeout = setTimeout(() => {
    cleanDynamicBubbles();
  }, 2000);
}
