import { random } from "./main.js"
import Ball from "./ball.js";

export default class CursorEffect {
    constructor(effectRadius) {
        this.x = 0;
        this.y = 0;
        this.r = effectRadius;
    }

    pull(ball) {
        const newX = this.x - ball.x;
        const newY = this.y - ball.y;
        const distance = Math.sqrt(newX ** 2 + newY ** 2);

        if(distance <= this.r){
            const directionX = newX / distance;
            const directionY = newY / distance;
            ball.x += directionX * 3;
            ball.y += directionY * 3;
        }
    }

    multiplyOnClick(ball, ballArr) {
        const clickRadius = 1;
        const a = this.x - ball.x;
        const b = this.y - ball.y;
        const c = (ball.r-clickRadius);
        const onBall = c**2>a**2 + b**2;

        if(onBall){
            ball.setRandomPosition(1500,700);
            const newBall = new Ball(
                ballArr.length, 
                random(1500),
                random(700),
                ball.r,
                ball.ctx);
            newBall.setRandomVelocity();
            ballArr.push(newBall);
        }
        return;
    }
}
