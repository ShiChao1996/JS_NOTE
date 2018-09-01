/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2018/04/04        ShiChao
 */

var canvas = document.getElementById("canvas");
var cxt = canvas.getContext("2d");
var centerX = 0,
  cneterY = 0;

var time = 0;

centerX = window.innerWidth / 2;
cneterY = window.innerHeight / 2;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // 获取浏览器窗口的中心坐标
  centerX = window.innerWidth / 2;
  cneterY = window.innerHeight / 2;
  // console.log("W:"+centerX + "H:"+cneterY);
};

function draw() {

  cxt.clearRect(0, 0, 10000, 10000);

  cxt.strokeStyle = "#fff";

  //画轨道，因其是相对太阳静止的，故与行星区分开来画
  function drawTrack() {

    for (var i = 1; i < 9; i++) {
      cxt.beginPath();
      cxt.arc(centerX, cneterY, 50 * i, 0, 360, false);
      cxt.closePath();
      cxt.stroke();
    }

  }

  drawTrack();

  function Planet(x, y, radius, cycle, inColor, outColor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.cycle = cycle;
    this.inColor = inColor;
    this.outColor = outColor;

    this.draw = function() {
      cxt.save();
      cxt.translate(centerX, cneterY);

      cxt.rotate(time * 360 / this.cycle * Math.PI / 200);


      cxt.beginPath();
      cxt.arc(this.x, this.y, this.radius, 0, 360, false);
      cxt.closePath();

      var sunColor = cxt.createRadialGradient(this.x, this.y, 0, this.x, this.y, 20);
      sunColor.addColorStop(0, this.inColor);
      sunColor.addColorStop(1, this.outColor);
      cxt.fillStyle = sunColor;
      cxt.fill();
      cxt.restore();
      time++;
    }
  }

  var sun = new Planet(0, 0, 20, 0, "#f00", "#f90");
  sun.draw();

  var Mercury = new Planet(-50, 0, 10, 288, "#A69697", "#5C3E40");
  Mercury.draw();

  var Venus = new Planet(-100, 0, 10, 505, "#C4BBAC", "#1F1315");
  Venus.draw();

  var Earth = new Planet(-150, 0, 10, 565, "#78B1E8", "#050C12");
  Earth.draw();

  var Mars = new Planet(-200, 0, 10, 687, "#CEC9B6", "#76422D");
  Mars.draw();

  var Jupiter = new Planet(-250, 0, 10, 4333, "#C0A48E", "#322222");
  Jupiter.draw();

  var Saturn = new Planet(-300, 0, 10, 10760, "#F7F9E3", "#5C4533");
  Saturn.draw();

  var Uranus = new Planet(-350, 0, 10, 30099, "#A7E1E5", "#19243A");
  Uranus.draw();

  var Neptune = new Planet(-400, 0, 10, 165 * 320, "#0661B2", "#1E3B73");
  Neptune.draw();

}

setInterval(draw, 50);
