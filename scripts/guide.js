
const maxProgress = document.getElementsByClassName("guideClassNameClarence").length;

const guideHints = [
  ["Add a new slide here", "createSlideButton", 12, 0],
  ["Edit existing slide here", "guideEditor", -12, -6],
  ["Download current slideshow here", "downloadButton", -6, -6],
  ["Save your progress here", "saveButton", -6, -6],
  ["Add new elements here", "elementAddButtonWrapper", -18, -42]
];

let lastBubble = undefined;

if (!seenGuide) {
  setTimeout(()=>{
    drawGuideBubble(0);
  }, 200);
}

function drawGuideBubble(progress, inputBoxShadow) {
  removeLastBubble();
  const currentGuideElements = document.getElementsByClassName("guideClassNameClarence");
  if(progress > 0) currentGuideElements[progress-1].style.boxShadow = inputBoxShadow;
  if(progress >= maxProgress) {
    seenGuide = true;
    window.localStorage.setItem("seenGuide", true);
    return;
  }
  const rects = currentGuideElements[progress].getBoundingClientRect();
  
  let lastBoxShadow = currentGuideElements[progress].style.boxShadow;
  currentGuideElements[progress].style.boxShadow = "rgba(255, 183, 3, 0.85) 0px 0px 15px";

  const bubbleElement = document.createElement("div");
  bubbleElement.setAttribute("onclick", `drawGuideBubble(${progress+1}, "${lastBoxShadow}");`);
  bubbleElement.className = "guideBubble";
  bubbleElement.style.top = rects.top + rects.height + guideHints[progress][2] + "px";
  bubbleElement.style.left = rects.left  + rects.width + guideHints[progress][3] +"px";
  bubbleElement.innerHTML = `
    ${guideHints[progress][0]}
    <div>${1+progress}/${maxProgress}<i class="fa fa-angle-right"></i></div>
  `;
  lastBubble = bubbleElement;
  document.body.appendChild(bubbleElement);
}

function removeLastBubble() {
  if(!lastBubble) return;
  const parent = lastBubble.parentElement;
  parent.removeChild(lastBubble);
}