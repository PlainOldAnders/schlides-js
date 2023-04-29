
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

function drawGuideBubble(progress) {
  removeLastBubble();
  if(progress >= maxProgress) {
    seenGuide = true;
    window.localStorage.setItem("seenGuide", true);
    return;
  }
  const currentGuideElement = document.getElementsByClassName("guideClassNameClarence")[progress];
  const rects = currentGuideElement.getBoundingClientRect();

  const bubbleElement = document.createElement("div");
  bubbleElement.setAttribute("onclick", `drawGuideBubble(${progress+1});`);
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