let titrantUsed = 0;
var liquid = document.getElementById("liquid");
// liquid.style.fill = "orange";

var buretteLiquid = document.getElementById("buretteLiquid");
buretteLiquid.classList.remove("buretteAnimation");

var drip = document.getElementById("drip");
console.log(drip);
if (drip.getAttribute("dur") === null) {
  drip.setAttribute("dur", "0s");
} else {
  drip.removeAttribute("dur");
}

function startdrip() {
  let colorchange = (Math.random() * 50).toFixed(1);
  colorchange = parseFloat(colorchange);
  console.log(colorchange);
  // speed=1;

  let intervalID = setInterval(() => {
    titrantUsed = parseFloat(titrantUsed) + 0.1;
    titrantUsed = parseFloat(titrantUsed).toFixed(1);
    document.getElementById("titrant-used").innerHTML =
      "Titrant Used : " + titrantUsed + "ml";
    if (titrantUsed == colorchange) {
      liquid.style.fill = "purple";
      drip.removeAttribute("dur");
      buretteLiquid.style.animationPlayState = "paused";
      clearInterval(intervalID);
    }
  }, 100);
  buretteLiquid.classList.add("buretteAnimation");

  if (drip.getAttribute("dur") === null) {
    drip.setAttribute("dur", "1s");
  } else {
    drip.removeAttribute("dur");
  }
}

document.querySelectorAll(".nav-link").forEach((item) => {
  item.addEventListener("click", (e) => {
    document.querySelector(".active").classList.remove("active");
    item.classList.add("active");
  });
});
