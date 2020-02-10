function getAge() {
  var birthDay = Number.parseInt(prompt("when were you born my friend"));
  var ageDays = 2020 - birthDay;
  var h1 = document.createElement("h1");
  var textAns = document.createTextNode("your age is " + ageDays + " years");
  //setting a new id named ageDayss t h1 tag
  h1.setAttribute("id", "ageDayss");
  h1.appendChild(textAns);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageDayss").remove();
}
