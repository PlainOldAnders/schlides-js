function getStringFromPath(path) {
  return `
    Image
    image
    image
    image
  `;
}

function getStringDimensions(value) {
  var maxSize = 0;
  var lines = value.split("\n");
  lines.forEach((line) => {
    if (line.length > maxSize) maxSize = line.length;
  });
  return [maxSize, lines.length];
}

function commandNameConverter(input) {
  const cmdMap = new Map([
    ["drawText", "Text"],
    ["drawBox", "Box"],
    ["drawLine", "Line"],
    ["drawList", "List"],
    ["drawASCIIImg", "Image"],
  ]);
  return cmdMap.get(input);
}
function commandNameDrawer(cmdName) {
  const cmdMap = new Map([
    ["drawText", createTextCard],
    ["drawBox", createBoxCard],
    ["drawLine", createLineCard],
    ["drawList", createListCard],
    ["drawASCIIImg", createImageCard],
  ]);
  return cmdMap.get(cmdName);
}
function commandNameStandardParams(cmdName) {
  const cmdMap = new Map([
    [
      "drawText",
      {
        x: slideShowObject.slideShow.config[0] / 2,
        y: slideShowObject.slideShow.config[1] / 2,
        text: "Text",
        align: "c",
      },
    ],
    [
      "drawBox",
      {
        x: slideShowObject.slideShow.config[0] / 2,
        y: slideShowObject.slideShow.config[1] / 2,
        text: "",
        boxWidth: 8,
        boxHeight: 4,
        borderValue: "#",
        borders: [1, 1, 1, 1],
        align: "l",
      },
    ],
    [
      "drawLine",
      {
        x: slideShowObject.slideShow.config[0] / 2,
        y: slideShowObject.slideShow.config[1] / 2,
        length: 3,
        lineChar: "-",
        isHorizontal: true,
        align: "l",
      },
    ],
    [
      "drawList",
      {
        list: ["Something"],
        x: slideShowObject.slideShow.config[0] / 2,
        y: slideShowObject.slideShow.config[1] / 2,
        isOrdered: false,
        bullet: "*",
      },
    ],
    [
      "drawASCIIImg",
      {
        x: slideShowObject.slideShow.config[0] / 2,
        y: slideShowObject.slideShow.config[1] / 2,
        imgPath: "Paste image here...",
        align: "c",
        vertAlign: true,
      },
    ],
  ]);
  return cmdMap.get(cmdName);
}
function alignmentLookUp(input) {
  const alignmentMap = new Map([
    ["l", "&#9887;"],
    ["c", "&#9776;"],
    ["r", "&#9886;"],
  ]);
  return alignmentMap.get(input);
}

function createTextCard(slideIndex, cmdIndex) {
  // The card
  const cmdCard = document.createElement("div");
  cmdCard.className = "cmdCard";

  const hackerWrapper = document.createElement("div");
  hackerWrapper.className = "hackerWrapper";

  // The title
  hackerWrapper.appendChild(getTitleWrapper(slideIndex, cmdIndex));

  // The text input
  hackerWrapper.appendChild(getTextAreaWrapper(slideIndex, cmdIndex));

  // The coordinate
  hackerWrapper.appendChild(getCoordinateWrapper(slideIndex, cmdIndex));

  // Add ned button
  hackerWrapper.appendChild(getCardAdderButton(slideIndex, cmdIndex));

  cmdCard.appendChild(hackerWrapper);

  // The options menu
  cmdCard.appendChild(getOptionsMenu(slideIndex, cmdIndex));
  return cmdCard;
}

function createLineCard(slideIndex, cmdIndex) {
  // The card
  const cmdCard = document.createElement("div");
  cmdCard.className = "cmdCard";

  const hackerWrapper = document.createElement("div");
  hackerWrapper.className = "hackerWrapper";

  // The title
  hackerWrapper.appendChild(getTitleWrapper(slideIndex, cmdIndex));

  // The bulk of the input
  hackerWrapper.appendChild(getLineEditorOptions(slideIndex, cmdIndex));

  const boolToggle = getBooleanInput(
    slideIndex,
    cmdIndex,
    "Horizontal",
    "Vertical",
    "isHorizontal"
  );
  hackerWrapper.appendChild(boolToggle);

  // The coordinate
  hackerWrapper.appendChild(getCoordinateWrapper(slideIndex, cmdIndex));

  // Add ned button
  hackerWrapper.appendChild(getCardAdderButton(slideIndex, cmdIndex));

  cmdCard.appendChild(hackerWrapper);

  // The options menu
  cmdCard.appendChild(getOptionsMenu(slideIndex, cmdIndex));
  return cmdCard;
}

function createBoxCard(slideIndex, cmdIndex) {
  // borderValue: "#",
  // borders: [1, 1, 1, 1],

  // The card
  const cmdCard = document.createElement("div");
  cmdCard.className = "cmdCard";

  const hackerWrapper = document.createElement("div");
  hackerWrapper.className = "hackerWrapper";

  // The title
  hackerWrapper.appendChild(getTitleWrapper(slideIndex, cmdIndex));

  // The text input
  hackerWrapper.appendChild(getTextAreaWrapper(slideIndex, cmdIndex));

  hackerWrapper.appendChild(getBoxEditorOptions(slideIndex, cmdIndex));

  // The coordinate
  hackerWrapper.appendChild(getCoordinateWrapper(slideIndex, cmdIndex));

  // Add new button
  hackerWrapper.appendChild(getCardAdderButton(slideIndex, cmdIndex));

  cmdCard.appendChild(hackerWrapper);

  // The options menu
  cmdCard.appendChild(getOptionsMenu(slideIndex, cmdIndex));
  return cmdCard;
}

function createListCard(slideIndex, cmdIndex) {
  // The card
  const cmdCard = document.createElement("div");
  cmdCard.className = "cmdCard";

  const hackerWrapper = document.createElement("div");
  hackerWrapper.className = "hackerWrapper";

  // The title
  hackerWrapper.appendChild(getTitleWrapper(slideIndex, cmdIndex, false));

  // The string list
  const stringListElement = getStringListInput(slideIndex, cmdIndex);
  hackerWrapper.appendChild(stringListElement);

  // The ordered/unordered input
  const boolToggle = getBooleanInput(
    slideIndex,
    cmdIndex,
    "Ordered",
    "Bullets",
    "isOrdered",
    false
  );
  hackerWrapper.appendChild(boolToggle);

  // The coordinate
  hackerWrapper.appendChild(getCoordinateWrapper(slideIndex, cmdIndex));

  // Add ned buttons
  hackerWrapper.appendChild(getCardAdderButton(slideIndex, cmdIndex));

  cmdCard.appendChild(hackerWrapper);

  // The options menu
  cmdCard.appendChild(getOptionsMenu(slideIndex, cmdIndex));
  return cmdCard;
}

function createImageCard(slideIndex, cmdIndex) {
  // The card
  const cmdCard = document.createElement("div");
  cmdCard.className = "cmdCard";

  const hackerWrapper = document.createElement("div");
  hackerWrapper.className = "hackerWrapper";

  // The image
  hackerWrapper.appendChild(getTitleWrapper(slideIndex, cmdIndex));

  // The image input
  hackerWrapper.appendChild(getTextAreaWrapper(slideIndex, cmdIndex, true));

  // The coordinate
  hackerWrapper.appendChild(getCoordinateWrapper(slideIndex, cmdIndex));

  // Add ned button
  hackerWrapper.appendChild(getCardAdderButton(slideIndex, cmdIndex));

  cmdCard.appendChild(hackerWrapper);

  // The options menu
  cmdCard.appendChild(getOptionsMenu(slideIndex, cmdIndex));
  return cmdCard;
}

function getNewSlideElement(index) {
  const idiotWrapper = document.createElement("div");
  idiotWrapper.className = "optionsWrapperLookUp";

  const newSlide = document.createElement("div");
  const numberTxt = document.createTextNode(index + 1);

  newSlide.appendChild(numberTxt);
  newSlide.className = "slideListItems";

  const newLink = document.createElement("a");
  newLink.href = "#" + (index + 1);
  newLink.appendChild(newSlide);
  idiotWrapper.appendChild(newLink);
  const optionsMenu = getOptionsMenu(index, 0, "optionsWrapperSlides");
  idiotWrapper.appendChild(optionsMenu);
  newSlide.setAttribute("onmouseover", `hoverSlideCreate(event, ${index})`);
  newSlide.setAttribute(
    "onmouseleave",
    `hoverSlideCreate(event, ${index}, true)`
  );
  return idiotWrapper;
}

function hoverSlideCreate(event, index, leave = false) {
  if (isMobile) return;
  const element =
    event.srcElement.parentElement.parentElement.getElementsByClassName(
      "optionsWrapperSlides"
    )[0];
  if (leave) {
    setInterval(() => {
      if (Date.now() - element.data > 1500) {
        element.style.display = "none";
      }
    }, 100);
  } else {
    const elements = document.body.getElementsByClassName(
      "optionsWrapperSlides"
    );
    for (var i = 0; i < elements.length; i++) {
      if (event.srcElement.className.includes("slideListItems")) {
        elements[i].style.display = "none";
      }
    }
    if (element) {
      element.style.display = "grid";
      element.data = Date.now();
    }
  }
}

function getCurrentIndex(url) {
  const urlSplitter = url.split("#");
  var index = urlSplitter[urlSplitter.length - 1];
  if (isNaN(index)) {
    index = 1;
  }
  return index;
}

function updateInput(event, slideIndex, cmdIndex, param, index = -1) {
  if (index < 0) {
    slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params[
      param
    ] = event.srcElement.value;
  } else {
    slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params[
      param
    ][index] = event.srcElement.value;
  }
  updateSlideshowSite(false, false);
}

function updateConfig(event, index) {
  slideShowObject.slideShow.config[index] = event.srcElement.value;
  updateSlideshowSite(false, true, true);
}

function updateInit(event, slideIndex, param, borderIndex = -1) {
  const value = event.srcElement.value;
  if (borderIndex > -1) {
    slideShowObject.slideShow.slides[slideIndex].init[param][borderIndex] =
      value;
  } else {
    value.length < 1
      ? (slideShowObject.slideShow.slides[slideIndex].init[param] = " ")
      : (slideShowObject.slideShow.slides[slideIndex].init[param] = value);
  }
  updateSlideshowSite();
}

function updateInputAlignment(event, slideIndex, cmdIndex, param) {
  if (event.srcElement.parentElement.className.includes("selectedAlignment"))
    return;

  const parent = event.srcElement.parentElement.parentElement;
  var index;
  for (var i = 1; i < parent.children.length; i++) {
    parent.children[i].className = "alignmentButtons";
    if (parent.children[i] == event.srcElement.parentElement) {
      index = i;
    }
  }
  parent.children[index].className = "alignmentButtons selectedAlignment";

  slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params.align =
    param;
  updateSlideshowSite();
}

function updateParamToggle(event, slideIndex, cmdIndex, paramName) {
  if (!event.srcElement.className.includes("boolOptions")) return;

  if (event.srcElement.className.includes("boolSelected")) return;

  const parent = event.srcElement.parentElement;
  var index;
  for (var i = 0; i < parent.children.length; i++) {
    parent.children[i].className = "boolOptions";
    if (parent.children[i] == event.srcElement) {
      index = i;
    }
  }
  parent.children[index].className = "boolOptions boolSelected";
  slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params[
    paramName
  ] = !!!index;
  updateSlideshowSite();
}

function deleteCommand(slideIndex, cmdIndex) {
  delete slideShowObject.slideShow.slides[slideIndex].commands.splice(
    cmdIndex,
    1
  );
  updateSlideshowSite(false, true);
}

function moveCommand(slideIndex, cmdIndex, dir) {
  if (cmdIndex + dir < 0) return;
  if (
    cmdIndex + dir >
    slideShowObject.slideShow.slides[slideIndex].commands.length - 1
  )
    return;
  const temp = slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex];
  slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex] =
    slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex + dir];
  slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex + dir] = temp;
  updateSlideshowSite(false, true);
}

function getBorderEditor(slideIndex) {
  const borderEdtiorWrapper = document.createElement("div");
  const labels = ["Top", "Right", "Bottom", "Left"];
  for (var i = 0; i < 4; i++) {
    const letter = labels[i];
    const individualWrapper = getNumberInput(
      letter + ":",
      0,
      slideShowObject.slideShow.config[0]
    );
    const input = individualWrapper.getElementsByTagName("input")[0];

    input.value = slideShowObject.slideShow.slides[slideIndex].init.borders[i];
    input.setAttribute(
      "onkeyup",
      `updateInit(event, ${slideIndex}, 'borders', ${i})`
    );
    input.setAttribute(
      "onchange",
      `updateInit(event, ${slideIndex}, 'borders', ${i})`
    );
    borderEdtiorWrapper.appendChild(individualWrapper);
  }
  var individualWrapper = getCharacterInput("Border:", 1);
  var input = individualWrapper.getElementsByTagName("input")[0];
  if (
    slideShowObject.slideShow.slides[slideIndex].init.borderChar == undefined
  ) {
    input.value = "";
  } else {
    input.value = slideShowObject.slideShow.slides[slideIndex].init.borderChar;
  }
  input.setAttribute(
    "onkeyup",
    `updateInit(event, ${slideIndex}, 'borderChar')`
  );
  borderEdtiorWrapper.appendChild(individualWrapper);
  return borderEdtiorWrapper;
}

function getCardAdderButton(slideIndex, cmdIndex, forceX, forceY) {
  const elementAddButtonWrapper = document.createElement("div");
  const symbols = ["T", "&#9744;", "&#8212;", "&#9776;", "&#9856;"];
  const commands = [
    "drawText",
    "drawBox",
    "drawLine",
    "drawList",
    "drawASCIIImg",
  ];
  for (var i = 0; i < 5; i++) {
    const commandAddButton = document.createElement("div");
    commandAddButton.className = "commandAddButton";
    commandAddButton.innerHTML = symbols[i];
    commandAddButton.title = "Draw " + commandNameConverter(commands[i]);
    commandAddButton.setAttribute(
      "onclick",
      `addCommand(${slideIndex}, ${cmdIndex},'${commands[i]}','${forceX}','${forceY}')`
    );
    elementAddButtonWrapper.appendChild(commandAddButton);
  }
  elementAddButtonWrapper.className = "elementAddButtonWrapper guideClassNameClarence";

  return elementAddButtonWrapper;
}

function getOptionsMenu(slideIndex, cmdIndex, className = "optionsWrapper") {
  const optionsWrapper = document.createElement("div");
  optionsWrapper.className = className;
  const options = [
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
  ];
  options.forEach((option) => {
    option.className =
      className == "optionsWrapper"
        ? "optionButton"
        : "optionButton slidesOptionButton";
    optionsWrapper.appendChild(option);
  });

  options[0].innerHTML = '<i class="fa fa-angle-up"></i>'; //Difficult up arrow
  options[0].setAttribute(
    "onclick",
    className == "optionsWrapper"
      ? `moveCommand(${slideIndex}, ${cmdIndex}, -1)`
      : `swapSlides(${slideIndex}, -1)`
  );
  options[1].innerHTML = "&#10005;";
  options[1].setAttribute(
    "onclick",
    className == "optionsWrapper"
      ? `deleteCommand(${slideIndex}, ${cmdIndex})`
      : `removeSlide(${slideIndex})`
  );
  options[2].innerHTML = '<i class="fa fa-angle-down"></i>'; //Difficult down arrow
  options[2].setAttribute(
    "onclick",
    className == "optionsWrapper"
      ? `moveCommand(${slideIndex}, ${cmdIndex}, 1)`
      : `swapSlides(${slideIndex}, 1)`
  );

  return optionsWrapper;
}

function getTitleWrapper(slideIndex, cmdIndex, renderAlignment = true) {
  const titleWrapper = document.createElement("div");
  titleWrapper.className = "titleWrapper";
  const cardTitle = document.createElement("span");
  cardTitle.className = "cardTitle";
  cardTitle.innerText = commandNameConverter(
    slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].name
  );
  titleWrapper.appendChild(cardTitle);

  if (!renderAlignment) return titleWrapper;

  const list = ["l", "c", "r"];
  for (var i = 0; i < 3; i++) {
    const alignmentWrapper = document.createElement("div");
    const alignment = document.createElement("span");
    if (
      slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params
        .align === list[i]
    ) {
      alignmentWrapper.className = "alignmentButtons selectedAlignment";
    } else {
      alignmentWrapper.className = "alignmentButtons";
    }
    alignment.innerHTML = alignmentLookUp(list[i]);
    alignmentWrapper.setAttribute(
      "onclick",
      `updateInputAlignment(event, ${slideIndex}, ${cmdIndex}, "${list[i]}")`
    );
    alignmentWrapper.appendChild(alignment);
    titleWrapper.appendChild(alignmentWrapper);
  }

  return titleWrapper;
}

function getTextAreaWrapper(slideIndex, cmdIndex, isImageBox = false) {
  const textareaWrapper = document.createElement("div");
  textareaWrapper.className = "textareaWrapper";
  const textarea = document.createElement("textarea");
  textarea.className = isImageBox ? "imageInputArea" : "inputArea";
  textarea.rows = isImageBox ? 10 : 4;
  textarea.cols = isImageBox ? 60 : 40;
  textarea.placeholder = "Write here...";
  const param = isImageBox ? "imgPath" : "text";
  textarea.setAttribute(
    "onkeyup",
    `updateInput(event, ${slideIndex}, ${cmdIndex}, "${param}")`
  );
  textarea.value =
    slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params[
      param
    ];
  textareaWrapper.appendChild(textarea);
  return textareaWrapper;
}

function getCoordinateWrapper(slideIndex, cmdIndex) {
  const coordinateWrapper = document.createElement("div");
  coordinateWrapper.className = "coordinateWrapper";
  for (var index = 0; index < 2; index++) {
    const letter = String.fromCharCode("x".charCodeAt(0) + index);
    const individualWrapper = getNumberInput(
      letter + ":",
      0,
      slideShowObject.slideShow.config[index]
    );
    const input = individualWrapper.getElementsByTagName("input")[0];
    input.value =
      slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params[
        letter
      ];
    input.setAttribute(
      "onkeyup",
      `updateInput(event, ${slideIndex}, ${cmdIndex}, '${letter}')`
    );
    input.setAttribute(
      "onchange",
      `updateInput(event, ${slideIndex}, ${cmdIndex}, '${letter}')`
    );
    coordinateWrapper.appendChild(individualWrapper);
  }
  return coordinateWrapper;
}

function getLineEditorOptions(slideIndex, cmdIndex) {
  const coordinateWrapper = document.createElement("div");
  coordinateWrapper.className = "coordinateWrapper";

  const individualWrapper = getNumberInput(
    "Length:",
    0,
    slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params
      .isHorizontal
      ? slideShowObject.slideShow.config[0]
      : slideShowObject.slideShow.config[1]
  );
  const input = individualWrapper.getElementsByTagName("input")[0];
  input.value =
    slideShowObject.slideShow.slides[slideIndex].commands[
      cmdIndex
    ].params.length;
  input.setAttribute(
    "onkeyup",
    `updateInput(event, ${slideIndex}, ${cmdIndex}, 'length')`
  );
  input.setAttribute(
    "onchange",
    `updateInput(event, ${slideIndex}, ${cmdIndex}, 'length')`
  );
  coordinateWrapper.appendChild(individualWrapper);

  var individualWrapperChar = getCharacterInput("Line:", 1);
  var inputChar = individualWrapperChar.getElementsByTagName("input")[0];
  if (
    slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params
      .lineChar == undefined
  ) {
    inputChar.value = "";
  } else {
    inputChar.value =
      slideShowObject.slideShow.slides[slideIndex].commands[
        cmdIndex
      ].params.lineChar;
  }
  inputChar.setAttribute(
    "onkeyup",
    `updateInput(event, ${slideIndex}, ${cmdIndex}, 'lineChar')`
  );
  coordinateWrapper.appendChild(individualWrapperChar);

  return coordinateWrapper;
}

function getBoxEditorOptions(slideIndex, cmdIndex) {
  const coordinateWrapper = document.createElement("div");
  coordinateWrapper.className = "coordinateWrapper";

  const paramList = ["boxWidth", "boxHeight"];
  const labelList = ["Width: ", "Height: "];
  for (var i = 0; i < 2; i++) {
    const individualWrapper = getNumberInput(
      labelList[i],
      1,
      slideShowObject.slideShow.config[i]
    );
    const input = individualWrapper.getElementsByTagName("input")[0];
    input.value =
      slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params[
        paramList[i]
      ];
    input.setAttribute(
      "onkeyup",
      `updateInput(event, ${slideIndex}, ${cmdIndex}, '${paramList[i]}')`
    );
    input.setAttribute(
      "onchange",
      `updateInput(event, ${slideIndex}, ${cmdIndex}, '${paramList[i]}')`
    );
    coordinateWrapper.appendChild(individualWrapper);
  }

  var individualWrapperChar = getCharacterInput("Border:", 1);
  var inputChar = individualWrapperChar.getElementsByTagName("input")[0];
  if (
    slideShowObject.slideShow.slides[slideIndex].commands[cmdIndex].params
      .borderValue == undefined
  ) {
    inputChar.value = "";
  } else {
    inputChar.value =
      slideShowObject.slideShow.slides[slideIndex].commands[
        cmdIndex
      ].params.borderValue;
  }
  inputChar.setAttribute(
    "onkeyup",
    `updateInput(event, ${slideIndex}, ${cmdIndex}, 'borderValue')`
  );
  coordinateWrapper.appendChild(individualWrapperChar);

  const borderEdtiorWrapper = document.createElement("div");
  borderEdtiorWrapper.className = "borderEdtiorCardWrapper";
  const labels = ["Top", "Right", "Bottom", "Left"];
  for (var i = 0; i < 4; i++) {
    const letter = labels[i];
    const individualWrapper = getNumberInput(
      letter + ":",
      0,
      slideShowObject.slideShow.config[i % 2]
    );
    const input = individualWrapper.getElementsByTagName("input")[0];

    input.value =
      slideShowObject.slideShow.slides[slideIndex].commands[
        cmdIndex
      ].params.borders[i];
    input.setAttribute(
      "onkeyup",
      `updateInput(event, ${slideIndex}, ${cmdIndex}, 'borders', ${i})`
    );
    input.setAttribute(
      "onchange",
      `updateInput(event, ${slideIndex}, ${cmdIndex}, 'borders', ${i})`
    );
    borderEdtiorWrapper.appendChild(individualWrapper);
  }

  coordinateWrapper.appendChild(borderEdtiorWrapper);
  return coordinateWrapper;
}

function getNumberInput(labelInput, min = -1, max = -1) {
  const individualWrapper = document.createElement("div");
  const input = document.createElement("input");
  input.className = "inputNumber";
  input.type = "number";
  if (min >= 0) input.min = min;
  if (max >= 0) input.max = max;
  const label = document.createElement("span");
  label.innerText = labelInput;
  label.className = "coordinateLabel";
  individualWrapper.appendChild(label);
  individualWrapper.appendChild(input);
  return individualWrapper;
}

function getCharacterInput(labelInput, max = -1) {
  const individualWrapper = document.createElement("div");
  const input = document.createElement("input");
  input.className = "inputNumber";
  input.type = "text";
  if (max > 0) input.maxLength = max;
  const label = document.createElement("span");
  label.innerText = labelInput;
  label.className = "coordinateLabel";
  individualWrapper.appendChild(label);
  individualWrapper.appendChild(input);
  return individualWrapper;
}

function getStringListElement(slideIndex, cmdIndex, inputVal, index) {
  const listElementWrapper = document.createElement("div");
  listElementWrapper.className = "listElementWrapper";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "inputField";
  input.value = inputVal;
  input.setAttribute(
    "onkeyup",
    `updateInput(event, ${slideIndex}, ${cmdIndex}, 'list', ${index})`
  );
  listElementWrapper.appendChild(input);

  const addNewStringElementButton = document.createElement("div");
  addNewStringElementButton.innerHTML = "&#43;";
  addNewStringElementButton.classList = "symbolButton";
  addNewStringElementButton.setAttribute(
    "onclick",
    `addNewListItemElement(${slideIndex}, ${cmdIndex}, ${index})`
  );
  const removeStringElementButton = document.createElement("div");
  removeStringElementButton.innerHTML = "&#10005;";
  removeStringElementButton.classList = "symbolButton";
  removeStringElementButton.style.color = "#dd2c00";
  removeStringElementButton.setAttribute(
    "onclick",
    `removeListItemElement(${slideIndex}, ${cmdIndex}, ${index})`
  );

  listElementWrapper.appendChild(addNewStringElementButton);
  listElementWrapper.appendChild(removeStringElementButton);
  return listElementWrapper;
}

function addNewListItemElement(slideIndex, cmdIndex, index) {
  slideShowObject.slideShow.slides[slideIndex].commands[
    cmdIndex
  ].params.list.splice(index + 1, 0, "");
  updateSlideshowSite(false, true);
}

function removeListItemElement(slideIndex, cmdIndex, index) {
  if (index === 0) return;
  slideShowObject.slideShow.slides[slideIndex].commands[
    cmdIndex
  ].params.list.splice(index, 1);
  updateSlideshowSite(false, true);
}

function getStringListInput(slideIndex, cmdIndex) {
  const listWrapper = document.createElement("div");
  listWrapper.className = "listWrapper";

  slideShowObject.slideShow.slides[slideIndex].commands[
    cmdIndex
  ].params.list.forEach((listElement, index) => {
    listWrapper.appendChild(
      getStringListElement(slideIndex, cmdIndex, listElement, index)
    );
  });

  return listWrapper;
}

function getBooleanInput(
  slideIndex,
  cmdIndex,
  label1,
  label2,
  paramName,
  def = true
) {
  const individualWrapper = document.createElement("div");
  individualWrapper.className = "boolPicker";
  const option1 = document.createElement("div");
  const option2 = document.createElement("div");

  option1.className = "boolOptions";
  option1.innerHTML = label1;
  option2.className = "boolOptions";
  option2.innerHTML = label2;

  def
    ? (option1.className += " boolSelected")
    : (option2.className += " boolSelected");

  individualWrapper.appendChild(option1);
  individualWrapper.appendChild(option2);
  individualWrapper.setAttribute(
    "onclick",
    `updateParamToggle(event, ${slideIndex}, ${cmdIndex}, '${paramName}')`
  );
  return individualWrapper;
}

function cleanDynamicBubbles() {
  const bubbles = document.getElementsByClassName("dynamicPlacerBubble");
  for (var i = 0; i < bubbles.length; i++) {
    document.body.removeChild(bubbles[i]);
  }
  clearTimeout(globalCleanTimeout);
}
