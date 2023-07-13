let datetime = new Date();

let tagDiv = document.querySelector(".mainfont");
let tagFooter = document.getElementById("footer");
let tagPDateTime = document.createElement("p");
tagFooter.appendChild(tagPDateTime);
tagDiv.appendChild(tagFooter);

tagFooter.lastChild.innerText = datetime.toString();

setInterval(function () {
  datetime= null;
  datetime = new Date();
  tagDiv.lastChild.lastChild.innerText = datetime.toString();
}, 1000);

