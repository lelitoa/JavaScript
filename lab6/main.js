const ball = document.getElementById('ball');
const hole = document.getElementById('hole');

hole.style.left = `${Math.random() * window.innerWidth}px`;
hole.style.top = `${Math.random() * window.innerHeight}px`;

let velocityX = 0;
let velocityY = 0;

function animation() {
   if (parseInt(ball.style.left) + velocityX < 0 || parseInt(ball.style.left) + velocityX > window.innerWidth - 50) {
      ball.style.left = `${parseInt(ball.style.left)}px`;
   } else {
      ball.style.left = `${parseInt(ball.style.left) + velocityX}px`;
   }
   if (parseInt(ball.style.top) + velocityY < 0 || parseInt(ball.style.top) + velocityY > window.innerHeight - 50) {
      ball.style.top = `${parseInt(ball.style.top)}px`;
   } else {
      ball.style.top = `${parseInt(ball.style.top) + velocityY}px`;
   }

   if (isOverlapping(ball, hole)) {
      alert("GOAL!!!");
   } else {
      window.requestAnimationFrame(animation);
   }
}

window.requestAnimationFrame(animation);

function isOverlapping(x, y) {
  const tmp = x.getBoundingClientRect();
  const tmp2 = y.getBoundingClientRect();

  return (
    (tmp.bottom - 25) - (tmp2.bottom - 25) < 50 && (tmp.bottom - 25) - (tmp2.bottom - 25) > -50 && 
    (tmp.left + 25) - (tmp2.left + 25) < 50 && (tmp.left + 25) - (tmp2.left + 25) > -50
  );
}

window.addEventListener("deviceorientation", (e) => {
  velocityX = e.gamma || 0;
  velocityY = (90 - (e.beta || 90))
});




// window.onload = function () {
//     var seconds = 00; 
//     var tens = 00; 
//     var appendTens = document.getElementById("tens")
//     var appendSeconds = document.getElementById("seconds")
//     var buttonStart = document.getElementById('button-start');
//     var buttonStop = document.getElementById('button-stop');
//     var buttonReset = document.getElementById('button-reset');
//     var Interval ;

//       Interval = setInterval(startTimer, 10);
    
//     //   buttonStop.onclick = function() {
//     //     clearInterval(Interval);
//     // }
    

//     // buttonReset.onclick = function() {
//     //   clearInterval(Interval);
//     //   tens = "00";
//     //   seconds = "00";
//     //   appendTens.innerHTML = tens;
//     //   appendSeconds.innerHTML = seconds;
//     // }
    
//     function startTimer () {
//       tens++; 
      
//       if(tens <= 9){
//         appendTens.innerHTML = "0" + tens;
//       }
      
//       if (tens > 9){
//         appendTens.innerHTML = tens;
        
//       } 
      
//       if (tens > 99) {
//         console.log("seconds");
//         seconds++;
//         appendSeconds.innerHTML = "0" + seconds;
//         tens = 0;
//         appendTens.innerHTML = "0" + 0;
//       }
      
//       if (seconds > 9){
//         appendSeconds.innerHTML = seconds;
//       }
//     }
// }



// let board = document.querySelector('.board');
// let initial_ball = document.querySelector('.ball');
// let ball = document.querySelector('.ball');
// let initial_ball_coord = ball.getBoundingClientRect();
// let ball_coord = initial_ball_coord;
// let board_coord = board.getBoundingClientRect();

// let dx = Math.floor(Math.random() * 4) + 3;
// let dy = Math.floor(Math.random() * 4) + 3;
// let dxd = Math.floor(Math.random() * 2);
// let dyd = Math.floor(Math.random() * 2);

// window.addEventListener('deviceorientation', onDeviceMove)

// function onDeviceMove(event) {
//     console.log(event)
// }

// function animation() {
//     //    console.log(Date.now())
//     // requestAnimationFrame(animation)
// }

// requestAnimationFrame(animation)

// requestAnimationFrame(() => {
//     dx = Math.floor(Math.random() * 4) + 3;
//     dy = Math.floor(Math.random() * 4) + 3;
//     dxd = Math.floor(Math.random() * 2);
//     dyd = Math.floor(Math.random() * 2);
//     moveBall(dx, dy, dxd, dyd);
// });

// function moveBall(dx, dy, dxd, dyd) {
//     if (ball_coord.top <= board_coord.top) {
//       dyd = 1;
//     }
//     if (ball_coord.bottom >= board_coord.bottom) {
//       dyd = 0;
//     }
//      {
//       dxd = 1;
//       dx = Math.floor(Math.random() * 4) + 3;
//       dy = Math.floor(Math.random() * 4) + 3;
//     }
//      {
//       dxd = 0;
//       dx = Math.floor(Math.random() * 4) + 3;
//       dy = Math.floor(Math.random() * 4) + 3;
//     }
//     if (
//       ball_coord.left <= board_coord.left ||
//       ball_coord.right >= board_coord.right
//     ) {  
//       // ball_coord = initial_ball_coord;
//       // ball.style = initial_ball.style;
//       return;
//     }
//     ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
//     ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
//     // ball_coord = ball.getBoundingClientRect();
//     requestAnimationFrame(() => {
//       moveBall(dx, dy, dxd, dyd);
//     });
// }