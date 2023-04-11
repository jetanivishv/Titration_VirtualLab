document.getElementById("knock").addEventListener("click", () => {
  document.getElementById("drop").classList.add("drop");
  document.getElementById("wave").classList.add("wave");
  setTimeout(() => {
    document.getElementById("drop").classList.remove("drop");
    document.getElementById("wave").classList.remove("wave");
  }, 2000);

  const liquid = document.getElementById("liquid");
  setTimeout(() => {
    liquid.style.height = liquid.offsetHeight + 10 + "px";
  }, 1000);

  if (liquid.offsetHeight > 30) {
    liquid.style.backgroundColor = "purple";
    document.getElementById("knock").disabled = true;
  }
});
