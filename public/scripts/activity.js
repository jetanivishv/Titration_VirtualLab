const answers = document.querySelectorAll(".ans");
const selection = document.querySelectorAll(".select");

var all = 0;
var droppableAccepted = {
  B1: false,
  B2: false,
  B3: false,
  B4: false,
  B5: false,
  B6: false,
  B7: false,
  B8: false,
  B9: false,
  B10: false,
  B11: false,
  B12: false,
};
var response = {};
var correctanswers = {};

const elementsArray = Array.from(selection);
for (let i = elementsArray.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [elementsArray[i], elementsArray[j]] = [elementsArray[j], elementsArray[i]];
}

const container = document.querySelector("#sidebar");
elementsArray.forEach((element) => container.appendChild(element));

selection.forEach((select) => {
  select.addEventListener("dragstart", dragStart);
  correctanswers["B" + select.id.substring(1)] = select.innerHTML;
  //   select.addEventListener('dragend', dragEnd);
});

answers.forEach((answer) => {
  answer.addEventListener("dragover", dragOver);
  answer.addEventListener("drop", drop);
});

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (droppableAccepted[e.target.id] == false) {
    droppableAccepted[e.target.id] = true;
    var data = e.dataTransfer.getData("text");
    var z = document.createElement("p");
    z.innerHTML = document.getElementById(data).innerHTML;
    e.target.appendChild(z);
    response[e.target.id] = document.getElementById(data).innerHTML;
    document.getElementById(data).remove();
    all = all + 1;
  }
}

function checking() {
  if (all < 12) {
    document.getElementById("error").innerHTML = "Please Identify All Figures";
  } else {
    document.getElementById("error").innerHTML = "";
    const keys = Object.keys(correctanswers);
    for (const key of keys) {
      if (correctanswers[key] != response[key]) {
        document.getElementById(key).style.backgroundColor = "#ff595e";
      } else {
        document.getElementById(key).style.backgroundColor = "#8ac926";
      }
      document.getElementById(key).style.color = "white";
    }
  }
}
