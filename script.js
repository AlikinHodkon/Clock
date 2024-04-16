const timezones = {
    msk: {
      offset: 0,
      name: "Москва",
    },
    london: {
      offset: -3,
      name: "Лондон",
    },
    tokyo: {
      offset: 5,
      name: "Токио",
    },
    rome: {
      offset: -2,
      name: "Рим",
    },
    newyork: {
      offset: -8,
      name: "Нью-Йорк",
    },
  };

  let arr = Object.entries(timezones);

  function updateClock(canvas, timezone) {
    const ctx = canvas.getContext("2d");
    let offset = 0;
    for (let tm of arr) {
      if (tm[0] == timezone) {
        offset = tm[1].offset;
      }
    }
    const now = new Date();
    const hours = now.getHours() + offset;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const clockRadius = (canvas.width / 2) * 0.9;
    const clockX = canvas.width / 2;
    const clockY = canvas.height / 2;

    function drawWheel(
      startAngle,
      endAngle,
      clockX,
      clockY,
      clockRadius1,
      clockRadius2
    ) {
      for (let i = 0; i < 13; i++) {
        ctx.arc(clockX, clockY, clockRadius1, startAngle, endAngle, false);
        startAngle = endAngle;
        endAngle += Math.PI / 12;
        ctx.arc(clockX, clockY, clockRadius2, startAngle, endAngle, false);
        startAngle = endAngle;
        endAngle += Math.PI / 12;
        ctx.stroke();
      }
    }

    ctx.beginPath();
    ctx.arc(clockX, clockY, clockRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    ctx.beginPath();
    let startAngle = 0;
    let endAngle = Math.PI / 12;
    for (let i = 0; i < 25; i++) {
      ctx.arc(clockX, clockY, clockRadius, startAngle, endAngle);
      ctx.fillStyle = "gold";
      ctx.fill();
      ctx.arc(clockX, clockY, clockRadius * 1.1, startAngle, endAngle);
      startAngle = endAngle;
      endAngle += Math.PI / 12;
      ctx.stroke();
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(clockX, clockY, clockRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      clockX,
      clockY + clockRadius / 3,
      clockRadius / 4,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(clockX, clockY + clockRadius / 3);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineTo(
      clockX +
        (clockRadius / 4) * 0.9 * Math.sin((Math.PI * milliseconds) / 500),
      clockY +
        clockRadius / 3 -
        (clockRadius / 4) * 0.9 * Math.cos((Math.PI * milliseconds) / 500)
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.fillStyle = "black";
    for (let i = 1; i < 97; i++) {
      ctx.moveTo(
        clockX + (clockRadius / 4) * 0.9 * Math.sin((Math.PI * i) / 48),
        clockY +
          clockRadius / 3 -
          (clockRadius / 4) * 0.9 * Math.cos((Math.PI * i) / 48)
      );
      ctx.lineTo(
        clockX + (clockRadius / 4) * Math.sin((Math.PI * i) / 48),
        clockY +
          clockRadius / 3 -
          (clockRadius / 4) * Math.cos((Math.PI * i) / 48)
      );
    }
    ctx.stroke();

    ctx.lineWidth = 3;

    ctx.beginPath();
    startAngle = 0 + (Math.PI / 24) * minutes;
    endAngle = Math.PI / 12 + (Math.PI / 24) * minutes;
    drawWheel(
      startAngle,
      endAngle,
      clockX - clockRadius / 4,
      clockY - clockRadius / 4,
      clockRadius / 2,
      ((clockRadius / 1.7) * 9.5) / 14
    );
    ctx.stroke();

    ctx.beginPath();
    startAngle = 0 - (Math.PI / 24) * seconds;
    endAngle = Math.PI / 12 - (Math.PI / 24) * seconds;
    drawWheel(
      startAngle,
      endAngle,
      clockX + 10 + clockRadius / 2,
      clockY + 20,
      clockRadius / 3,
      ((clockRadius / 2.7) * 9.5) / 14
    );
    ctx.stroke();

    ctx.beginPath();
    startAngle = 0 + (Math.PI / 24) * seconds;
    endAngle = Math.PI / 12 + (Math.PI / 24) * seconds;
    drawWheel(
      startAngle,
      endAngle,
      clockX,
      clockY + clockRadius / 2,
      clockRadius / 4,
      ((clockRadius / 3.7) * 9.5) / 14
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineTo(
      clockX +
        clockRadius *
          0.9 *
          Math.sin((Math.PI * (seconds * 1000 + milliseconds)) / 30000),
      clockY -
        clockRadius *
          0.9 *
          Math.cos((Math.PI * (seconds * 1000 + milliseconds)) / 30000)
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineTo(
      clockX + clockRadius * 0.9 * Math.sin((Math.PI * minutes) / 30),
      clockY - clockRadius * 0.9 * Math.cos((Math.PI * minutes) / 30)
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.lineTo(
      clockX + clockRadius * 0.5 * Math.sin((Math.PI * hours) / 6),
      clockY - clockRadius * 0.5 * Math.cos((Math.PI * hours) / 6)
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "48px serif";
    ctx.textAlign = "center";
    for (let i = 1; i < 13; i++) {
      ctx.fillText(
        i,
        clockX + clockRadius * 0.8 * Math.sin((Math.PI * i) / 6),
        clockY + 12 - clockRadius * 0.8 * Math.cos((Math.PI * i) / 6)
      );
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.fillStyle = "black";
    for (let i = 1; i < 13; i++) {
      ctx.moveTo(
        clockX + clockRadius * 0.9 * Math.sin((Math.PI * i) / 6),
        clockY - clockRadius * 0.9 * Math.cos((Math.PI * i) / 6)
      );
      ctx.lineTo(
        clockX + clockRadius * Math.sin((Math.PI * i) / 6),
        clockY - clockRadius * Math.cos((Math.PI * i) / 6)
      );
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.fillStyle = "black";
    for (let i = 1; i < 25; i++) {
      ctx.moveTo(
        clockX + clockRadius * 0.95 * Math.sin((Math.PI * i) / 12),
        clockY - clockRadius * 0.95 * Math.cos((Math.PI * i) / 12)
      );
      ctx.lineTo(
        clockX + clockRadius * Math.sin((Math.PI * i) / 12),
        clockY - clockRadius * Math.cos((Math.PI * i) / 12)
      );
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.fillStyle = "black";
    for (let i = 1; i < 96; i++) {
      ctx.moveTo(
        clockX + clockRadius * 0.975 * Math.sin((Math.PI * i) / 48),
        clockY - clockRadius * 0.975 * Math.cos((Math.PI * i) / 48)
      );
      ctx.lineTo(
        clockX + clockRadius * Math.sin((Math.PI * i) / 48),
        clockY - clockRadius * Math.cos((Math.PI * i) / 48)
      );
    }
    ctx.stroke();
  }
  function tick() {
    const clocks = document.querySelectorAll(".clock");
    clocks.forEach(function (clock) {
      const canvas = clock.querySelector("canvas");
      const timezone = clock.id;
      updateClock(canvas, timezone);
    });
    requestAnimationFrame(tick);
  }
  function addClock(timezone) {
    const container = document.querySelector(".clock-container");
    if (document.getElementById(timezone)) return;
    const canv = document.createElement("canvas");
    const newDiv = document.createElement("div");
    const button = document.createElement("button");
    let name = "";
    for (let tm of arr) {
      if (tm[0] == timezone) {
        name = tm[1].name;
      }
    }
    const textButton = document.createTextNode("Удалить");
    const text = document.createTextNode(name);
    const h3 = document.createElement("h3");
    canv.width = 500;
    canv.height = 500;
    newDiv.classList = "clock";
    newDiv.id = timezone;
    container.append(newDiv);
    newDiv.append(h3);
    h3.append(text);
    h3.append(button);
    button.append(textButton);
    newDiv.append(canv);
    h3.addEventListener("click", (event) => {
      newDiv.remove();
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    tick();

    const select = document.getElementById("timezone");
    for (const timezone in timezones) {
      const option = document.createElement("option");
      option.value = timezone;
      option.innerText = timezones[timezone].name;
      select.appendChild(option);
    }

    document
      .getElementById("add")
      .addEventListener("click", () =>
        addClock(document.getElementById("timezone").value)
      );

    addClock("msk");
  });