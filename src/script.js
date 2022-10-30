let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
let min = now.getMinutes();

let dt = document.querySelector("#date");
dt.innerHTML = `${day} ${hour} : ${min}`;