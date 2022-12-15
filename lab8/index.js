import Ball from "./ball.js";
import CursorEffect from "./effects.js";

const WIDTH = 1500;
const HEIGHT = 700;
// canvas.height=window.innerHeight;
// canvas.width=window.innerWidth;
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const amountSlider = document.querySelector('#ball-amount');
const canvas = document.querySelector('#field')
const ctx = canvas.getContext('2d');

let ballArr = [];
let animationOn = false;
const cursorEffect = new CursorEffect(75);

const setup = () => {
    ballArr = []
    for (let i = 0; i < parseInt(amountSlider.value); i++) {
        const x = random(WIDTH);
        const y = random(HEIGHT);
        ballArr.push(new Ball(i,x,y,random(5,10),ctx)) 
    }
}

const draw = () => {
    animationOn = true;
    ctx.clearRect(0,0, WIDTH, HEIGHT);
    
    for (let i = 0; i < ballArr.length; i++) {
        ballArr[i].show();
        ballArr[i].update();
        ballArr[i].edges(WIDTH, HEIGHT);
    }

    ctx.beginPath();
    ctx.arc(cursorEffect.x, cursorEffect.y, cursorEffect.r, 0, Math.PI*2)
    ctx.stroke()
    requestAnimationFrame(draw);
}

startBtn.addEventListener('click', (e) => {
    setup();
    ballArr.forEach(ball => ball.setRandomVelocity());
    !animationOn && draw();
    console.table(ballArr)
    e.target.setAttribute('disabled', null)
});

resetBtn.addEventListener('click', () => {
    setup();
    ballArr.forEach(ball => {
        ball.setRandomPosition(WIDTH,HEIGHT);
        ball.setRandomVelocity();
    });

    !animationOn && draw();
});

export const random = (min, max) => {
    if(!max)
        return Math.random() * min;
    else{
      let rnd = Math.random()*(max-min+1)+min;
      if(rnd > max) rnd = Math.floor(rnd);
      else if(rnd < min) Math.ceil(rnd);
      return rnd;
    }
}

export const map = (value, start1, stop1, start2, stop2, withinBounds = false) => {
    const newval = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return constrain(newval, start2, stop2);
    } else {
      return constrain(newval, stop2, start2);
    }
}

export const constrain = (n, low, high) => {
    return Math.max(Math.min(n,high), low)
}

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     x += dx;
//     y += dy;
// }

// setInterval(draw, 5);

// for (let i = 0; i < 10; i++) {
//     setInterval(draw, 10);
// }

// const setup = () => {
//     for (let i = 0; i < QTY; i++) {
//         x = random(width);
//         const x = random(width);
//         const y = random(heiht);
//     }
// }

// setup();

// const random = (min, max) => {
//     if(!max)
//         return Math.floor(Math.random() * min);
//     else
//         return Math.floor(Math.random()*(max-min+1)+min);
// }
