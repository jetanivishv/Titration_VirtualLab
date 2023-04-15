var allQue = assignments;
let container = document.getElementById("assignments");

for (let topic in allQue) {
  mainTopic = document.createElement("div");
  mainTopic.innerHTML = topic;
  mainTopic.classList.add("mainTopic");
  container.appendChild(mainTopic);
  console.log(topic);

  for (let subtopic in allQue[topic]) {
    console.log(subtopic);
    category = document.createElement("div");
    category.innerHTML = subtopic;
    category.classList.add("category");
    container.appendChild(category);
    catul = document.createElement("ol");
    catul.classList.add("quelist");
    for (let que of allQue[topic][subtopic]) {
      console.log(que);
      question = document.createElement("li");
      question.innerHTML = que;
      question.classList.add("Assquestion");
      catul.appendChild(question);
      container.appendChild(catul);
    }
  }
}
