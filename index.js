const ct = document.querySelector("#current-time");
const sh = document.querySelector("#hours");
const sm = document.querySelector("#minutes");
const ss = document.querySelector("#seconds");
const sa = document.querySelector("#am-pm");
const sab = document.querySelector("#submitButton");
const ac = document.querySelector("#alarms-container");
const rt = new Audio('./file/ringtone.mp3');

const cd = new Date();

const wd = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const mth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const wkd = wd[cd.getDay()];
const mnt = mth[cd.getMonth()];
const dy = cd.getDate();
const yr = cd.getFullYear();

document.getElementById('month').textContent = mnt;
document.getElementById('date').textContent = dy;
document.getElementById('year').textContent = yr;

window.addEventListener("DOMContentLoaded", (event) => {
  ddm(1, 12, sh);
  ddm(0, 59, sm);
  ddm(0, 59, ss);
  setInterval(gct, 1000);
  fa();
});

sab.addEventListener("click", gi);

function uc() {
  var n = new Date();
  var h = n.getHours();
  var m = n.getMinutes();
  var s = n.getSeconds();

  var ts = h.toString().padStart(2, '0') + ':'
    + m.toString().padStart(2, '0') + ':'
    + s.toString().padStart(2, '0');
}

setInterval(uc, 1000);

function ddm(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dd = document.createElement("option");
    dd.value = i < 10 ? "0" + i : i;
    dd.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dd);
  }
}

function gct() {
  let t = new Date();
  t = t.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  ct.innerHTML = t;

  return t;
}

function gi(e) {
  e.preventDefault();
  const hv = sh.value;
  const mv = sm.value;
  const sv = ss.value;
  const av = sa.value;

  const atime = ctt(
    hv,
    mv,
    sv,
    av
  );
  sal(atime);
}

function ctt(hour, minute, second, amPm) {
  return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}

function sal(time, fetching = false) {
  const alarm = setInterval(() => {
    if (time === gct()) {
       alert("Alarm Ringing");
      rt.play();
    }

    console.log("running");
  }, 500);

  aatd(time, alarm);
  if (!fetching) {
    saveAlarm(time);
  }
}

function aatd(time, intervalId) {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb", "d-flex");
  alarm.innerHTML = `
              <div class="time">${time}</div>
              <button class="btn delete-alarm" data-id=${intervalId}>Delete</button>
              `;
  const deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => da(e, time, intervalId));

  ac.prepend(alarm);
}

function ca() {
  let alarms = [];
  const isPresent = localStorage.getItem("alarms");
  if (isPresent) alarms = JSON.parse(isPresent);

  return alarms;
}

function saveAlarm(time) {
  const alarms = ca();

  alarms.push(time);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

function fa() {
  const alarms = ca();

  alarms.forEach((time) => {
    sal(time, true);
  });
}

function da(event, time, intervalId) {
  const self = event.target;

  clearInterval(intervalId);

  const alarm = self.parentElement;

  daf(time);
  alarm.remove();
}

function daf(time) {
  const alarms = ca();

  const index = alarms.indexOf(time);
  alarms.splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

function stopAlarm() {
    rt.pause();
}
