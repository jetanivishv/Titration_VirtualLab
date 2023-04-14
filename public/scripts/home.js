let titrantUsed = 0;
var liquid = document.getElementById("liquid");
let start=document.getElementById('startBtn')
let reset=document.getElementById('resetBtn')

var buretteLiquid = document.getElementById("buretteLiquid");
buretteLiquid.classList.remove("buretteAnimation");
var rightPanel=document.getElementById("rightPanel");

var drip = document.getElementById("drip");
console.log(drip);
if (drip.getAttribute("dur") === null) {
  drip.setAttribute("dur", "0s");
} else {
  drip.removeAttribute("dur");
}

function resetdrip(){
  console.log("here");
  var form = document.getElementById("data");
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = false;
  }
  start.disabled=false;
  reset.disabled=true;
}

function startdrip() {
  console.log("there");
  //disable form
  var form = document.getElementById("data");
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = true;
  } 
  start.disabled=true;
  console.log(start);

  let colorchange = (Math.random() * 50).toFixed(1);
  colorchange = parseFloat(colorchange);
  console.log(colorchange);
  buretteLiquid.classList.add("buretteAnimation");
  let intervalID = setInterval(() => {
    titrantUsed = parseFloat(titrantUsed) + 0.1;
    titrantUsed = parseFloat(titrantUsed).toFixed(1);
    document.getElementById("titrant-used").innerHTML =
      "Volume of Titrant Used(V2) : " + titrantUsed + " ml";
    if (titrantUsed == colorchange) {
      calculation=document.getElementById('calculation');
      buretteLiquid.style.animationPlayState = "paused";
      calculation.innerHTML=`<div><br><div><b>Calculation : </b></div><div>N1*V1=N2*V2</div><div>N2=N1*V1/V2</div><div>N2=${elements[2].value}*${elements[8].value}/${titrantUsed}</div><div>N2=${((elements[2].value*elements[8].value)/titrantUsed).toFixed(2)} N</div><div>Normality of Titrant = ${((elements[2].value*elements[8].value)/titrantUsed).toFixed(2)} N</div></div>`
      liquid.style.fill = "purple";
      drip.removeAttribute("dur");
      reset.disabled=false;
      clearInterval(intervalID);
    }
  }, 100);

  details=document.getElementById("details");
  details.innerHTML = `<div><b>Objective : </b>Determine the Normality of titrant</div><div>Titrant : ${elements[0].value}</div><div>Titrate : ${elements[4].value}</div><div>Indicator : ${elements[10].value}</div><div>Volume of Titrate(V1) : ${elements[8].value} ml <div>Normality of Titrate (N1): ${elements[2].value} N</div></div>`;

 

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
