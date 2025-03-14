const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

// // * easy way
// setInterval(() => {
//   const [hour, minute, second] = new Date()
//     .toTimeString()
//     .slice(0, 8)
//     .split(":");
//   hourEl.innerText = hour;
//   minuteEl.innerText = minute;
//   secondEl.innerText = second;
// }, 1000);

//* medium way
let timeArray = new Date()
  .toTimeString()
  .slice(0, 8)
  .split(":")
  .map((time) => (time[0] === "0" ? Number(time.slice(1)) : Number(time)));
let totalSecond = timeArray[0] * 3600 + timeArray[1] * 60 + timeArray[2];

setInterval(() => {
  hourEl.innerText = (
    Math.floor(totalSecond / 3600) > 12
      ? Math.floor(totalSecond / 3600) - 12
      : Math.floor(totalSecond / 3600)
  )
    .toString()
    .padStart(2, "0");
  minuteEl.innerText = Math.floor((totalSecond % 3600) / 60)
    .toString()
    .padStart(2, "0");
  secondEl.innerText = (totalSecond % 60).toString().padStart(2, "0");
  totalSecond++;
}, 1000);

// * hard way
// let [hour, minute, second] = new Date()
//   .toTimeString()
//   .slice(0, 8)
//   .split(":")
//   .map((time) => (time[0] === "0" ? Number(time.slice(1)) : Number(time)));

// function renderTimes() {
//   hourEl.innerText = (hour > 12 ? hour - 12 : hour).toString().padStart(2, "0");
//   minuteEl.innerText = minute.toString().padStart(2, "0");
//   secondEl.innerText = second.toString().padStart(2, "0");
// }
// renderTimes();

// setInterval(() => {
//   if (second === 59) {
//     if (minute === 59) {
//       minute = 0;
//       if (hour == 12) {
//         hour = 1;
//       } else {
//         hour++;
//       }
//     } else {
//       minute++;
//     }
//     second = 0;
//   } else {
//     second++;
//   }
//   renderTimes();
// }, 1000);
