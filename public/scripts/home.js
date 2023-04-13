var liquid = document.getElementById('liquid');
// liquid.style.fill="orange";

var buretteLiquid=document.getElementById('buretteLiquid');
buretteLiquid.classList.remove('buretteAnimation')

var drip=document.getElementById('drip');
console.log(drip);
if (drip.getAttribute("dur") === null) {
    drip.setAttribute("dur", "0s");
} 
else {
    drip.removeAttribute("dur");
}

function startdrip(){
    buretteLiquid.classList.add('buretteAnimation')
    if (drip.getAttribute("dur") === null) {
        drip.setAttribute("dur", "1s");
      } 
    //   else {
    //     drip.removeAttribute("dur");
    //   }
}

