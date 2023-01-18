import Ball from "./ball.js";
import CursorEffect from "./effects.js";

const WIDTH = 1500;
const HEIGHT = 700;
// canvas.height=window.innerHeight;
// canvas.width=window.innerWidth;

const start = document.querySelector('#start');
const reset = document.querySelector('#reset');
const count = document.querySelector('#count');
const lines = document.querySelector('#lines');
const move = document.querySelector('#move');
const eat = document.querySelector('#eat');
const canvas = document.querySelector('#field')
const ctx = canvas.getContext('2d');

let ballArr = [];
let animationOn = false;
let mouseOn = move.checked;
let eatOn = eat.checked;
const cursorEffect = new CursorEffect(70);

const setup = () => {
    ballArr = []
    mouseOn = move.checked;
    eatOn = eat.checked;
    for (let i = 0; i < parseInt(count.value); i++) {
        const x = random(WIDTH);
        const y = random(HEIGHT);
        ballArr.push(new Ball(i,x,y,random(5,15),ctx)) 
        ballArr[i].linesBetween = lines.value;
    }
}

const draw = () => {
    animationOn = true;
    ctx.clearRect(0,0, WIDTH, HEIGHT);
    
    for (let i = 0; i < ballArr.length; i++) {
        for (let j = i; j < ballArr.length; j++) {
            if(ballArr[i].id !== ballArr[j].id) {
                ballArr[i].connect(ballArr[j])
                eatOn && ballArr[i].consume(ballArr[j], (ball) => {
                    const toDelete = ballArr.find((el) => el.id == ball.id) 
                    ballArr.splice(ballArr.indexOf(toDelete), 1);
                })
            }    
        }
        ballArr[i].show();
        ballArr[i].update();
        ballArr[i].edges(WIDTH, HEIGHT);
        mouseOn && cursorEffect.pull(ballArr[i]);
    }
    requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', (e) => {
    cursorEffect.x = e.clientX - 10;
    cursorEffect.y = e.clientY - 10;
});

canvas.addEventListener('click', () => {
    ballArr.forEach(ball => {
        cursorEffect.multiplyOnClick(ball, ballArr)
        ball.linesBetween = lines.value; 
    });
});

start.addEventListener('click', (e) => {
    setup();
    ballArr.forEach(ball => ball.setRandomVelocity());
    e.target.setAttribute('disabled', null)
    !animationOn && draw();
});

reset.addEventListener('click', () => {
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
      let rnd = Math.random() * (max-min+1)+min;
      if(rnd > max) rnd = Math.floor(rnd);
      else if(rnd < min) Math.ceil(rnd);
      return rnd;
    }
}

export const func = (n, low, high) => {
    return Math.max(Math.min(n,high), low)
}

export const map = (value, start, stop, start2, stop2, bounds = false) => {
    const val = (value - start) / (stop - start) * (stop2 - start2) + start2;
    if (!bounds) {
      return val;
    }
    if (start2 < stop2) {
      return func(val, start2, stop2);
    } else {
      return func(val, stop2, start2);
    }
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
