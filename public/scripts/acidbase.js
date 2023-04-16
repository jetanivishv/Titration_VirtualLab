let titrantUsed = 0;
var liquid = document.getElementById("liquid");
let start = document.getElementById("startBtn");
let reset = document.getElementById("resetBtn");
let details = document.getElementById("details");
let calculation = document.getElementById("calculation");
let titrantUsedDom = document.getElementById("titrant-used");
let message = document.getElementById("message");

var initialindicator = {
  "Methyl Orange": "red",
  Phenolphthalein: "grey",
  "Methyl red": "red",
};

var indicatorschange = {
  "Methyl Orange": "yellow",
  Phenolphthalein: "pink",
  "Methyl red": "yellow",
};

var buretteLiquid = document.getElementById("buretteLiquid");
buretteLiquid.classList.remove("buretteAnimation");
var rightPanel = document.getElementById("rightPanel");

var drip = document.getElementById("drip");
if (drip.getAttribute("dur") === null) {
  drip.setAttribute("dur", "0s");
} else {
  drip.removeAttribute("dur");
}

function resetdrip() {
  details.innerHTML = "";
  calculation.innerHTML = "";
  titrantUsedDom.innerHTML = "";
  message.style.display = "block";

  var form = document.getElementById("data");
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = false;
  }
  start.disabled = false;
  start.classList.remove("disabled");
  reset.disabled = true;
  reset.classList.add("disabled");
  liquid.style.fill = "rgb(69, 135, 234)";
  buretteLiquid.style.animationName = "none";
}

function startdrip() {
  titrantUsed = 0;
  buretteLiquid.style.animationName = "draw";
  buretteLiquid.style.animationPlayState = "running";
  message.style.display = "none";

  //disable form
  var form = document.getElementById("data");
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = true;
  }

  liquid.style.fill = initialindicator[elements[10].value];
  start.disabled = true;
  start.classList.add("disabled");

  let colorchange = (Math.random() * 50).toFixed(1);
  colorchange = parseFloat(colorchange);
  buretteLiquid.classList.add("buretteAnimation");
  let intervalID = setInterval(() => {
    titrantUsed = parseFloat(titrantUsed) + 0.1;
    titrantUsed = parseFloat(titrantUsed).toFixed(1);

    titrantUsedDom.innerHTML =
      "Volume of Titrant Used(V2) : " + titrantUsed + " ml";

    if (titrantUsed == colorchange) {
      buretteLiquid.style.animationPlayState = "paused";

      calculation.innerHTML = `<div><br><div><b>Calculation : </b></div><div><b>N1*V1=N2*V2</b></div><div><b>N1=(N2*V2)/V1<b></div><div>N1=${
        elements[7].value
      }*${titrantUsed}/${elements[8].value}</div><div>N2=${(
        (elements[7].value * titrantUsed) /
        elements[8].value
      ).toFixed(2)} N</div><div><i><b>Normality of Titrate(Analyte) = ${(
        (elements[7].value * titrantUsed) /
        elements[8].value
      ).toFixed(2)} N</b></i></div></div>`;
      liquid.style.fill = indicatorschange[elements[10].value];
      drip.removeAttribute("dur");
      reset.disabled = false;
      reset.classList.remove("disabled");

      clearInterval(intervalID);
    }
  }, 100);

  details.innerHTML = `<div><b>Objective : </b>Determine the Normality of titrate</div><ul><li><b>Titrant:</b> ${elements[0].value}</li><li><b>Titrate(Analyte): </b>${elements[4].value}</li><li><b>Indicator:</b> ${elements[10].value}</li><li><b>Volume of Titrate(Analyte)(V1):</b> ${elements[8].value} ml</li><li><b>Normality of Titrant (N2):</b> ${elements[7].value} N</li></ul>`;

  if (drip.getAttribute("dur") === null) {
    let speed = elements[2].value;
    drip.setAttribute("dur", (1.1 - speed).toString() + "s");
  } else {
    drip.removeAttribute("dur");
  }
}

var titrants = [
  "Hydrochloric acid",
  "Sulphuric acid",
  "Hydrobromic acid",
  "Oxalic acid",
  "Acetic acid",
];
const titrantList = document.getElementById("titrants");
titrants.forEach((item) => {
  const optiont = document.createElement("option");
  optiont.innerText = item;
  optiont.value = item;
  titrantList.appendChild(optiont);
});
var titrates = [
  "Sodium hydroxide",
  "Potassium hydroxide",
  "Ammonia",
  "Sodium Carbonrate",
];
const titratesList = document.getElementById("titrates");
titrates.forEach((item) => {
  const optiont = document.createElement("option");
  optiont.innerText = item;
  optiont.value = item;
  titratesList.appendChild(optiont);
});
var indicators = ["Methyl Orange", "Phenolphthalein", "Methyl red"];
const indicatorsList = document.getElementById("indicators");
indicators.forEach((item) => {
  const optiont = document.createElement("option");
  optiont.innerText = item;
  optiont.value = item;
  indicatorsList.appendChild(optiont);
});
