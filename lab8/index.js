var canvas = document.getElementById("field");
canvas.height=window.innerHeight; 
canvas.width=window.innerWidth; 
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(100, 100, 30, 0, 2 * Math.PI);
ctx.stroke();
