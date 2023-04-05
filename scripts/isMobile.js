// Mobile init
if (isMobile) {
  setCurrentSelecetd(0);
} else {
  document.getElementById("mobileToggle").style.display = "none";
}

function showHideForMobile(index) {
  const slideList = document.getElementsByClassName("slideList")[0];
  const editor = document.getElementsByClassName("editor")[0];
  const result = document.getElementsByClassName("result")[0];

  switch (index) {
    default:
    case 0:
      slideList.style.display = "grid";
      editor.style.display = "none";
      result.style.display = "none";
      break;
    case 1:
      slideList.style.display = "none";
      editor.style.display = "block";
      result.style.display = "none";
      break;
    case 2:
      slideList.style.display = "none";
      editor.style.display = "none";
      result.style.display = "block";
      break;
  }
}

function toggleMobileView(event) {
  var clickedIndex = 0;
  const mobileToggleElements =
    document.getElementsByClassName("mobileToggleOption");
  for (var i = 0; i < mobileToggleElements.length; i++) {
    if (mobileToggleElements[i] == event.srcElement) clickedIndex = i;
  }

  if (clickedIndex == getCurrentSelected()) {
    if (getCurrentSelected() == mobileToggleElements.length - 1) {
      setCurrentSelecetd(0);
    } else {
      setCurrentSelecetd(clickedIndex + 1);
    }
  } else {
    setCurrentSelecetd(clickedIndex);
  }
}

function setCurrentSelecetd(target) {
  showHideForMobile(target);
  const mobileToggleElements =
    document.getElementsByClassName("mobileToggleOption");
  for (var i = 0; i < mobileToggleElements.length; i++) {
    mobileToggleElements[i].className = "mobileToggleOption";
  }
  mobileToggleElements[target].className =
    "mobileToggleOption mobileToggleSelected";
}

function getCurrentSelected() {
  const mobileToggleElements =
    document.getElementsByClassName("mobileToggleOption");
  for (var i = 0; i < mobileToggleElements.length; i++) {
    if (mobileToggleElements[i].className.includes("mobileToggleSelected")) {
      return i;
    }
  }
}
