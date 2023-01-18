import { func, map, random } from "./main.js";

export default class Ball {
    constructor(id,x,y,r,ctx) {
        this.id = id
        this.x = x;
        this.y = y;
        this.r = r;
        this.m = 2*this.r;
        this.vX = 0;
        this.vY = 0;
        this.linesBetween = 0;
        this.ctx = ctx;
    }

    consume(ball, deleteB) {
        const a = this.x - ball.x;
        const b = this.y - ball.y;
        const c = Math.sqrt(a**2 + b**2);

        if(c <= this.linesBetween) {
            const value = 0.05;
            if(this.m > ball.m) {
                this.r += value;
                this.m += 2*value;
                ball.r -= value;
                ball.m -= 2*value;
                if(ball.m < 1) deleteB(ball);
            } else if(ball.m > this.m) {
                ball.r += value;
                ball.m += 2*value;
                this.r -= value;
                this.m -= 2*value;
                if(this.m < 1) deleteB(this);
            }
        }  
        this.vX = this.vX > 0 ? map(this.m, 1, 200, 3, 0.1, true) : map(this.m, 1, 200, -3, -0.1, true);
        this.vY = this.vY > 0 ? map(this.m, 1, 200, 3, 0.1, true) : map(this.m, 1, 200, -3, -0.1, true);     
    }

    connect(ball) {
        const a = this.x - ball.x;
        const b = this.y - ball.y;
        const c = Math.sqrt(a**2 + b**2);

        if(c <= this.linesBetween) {
            this.ctx.beginPath()
            this.ctx.globalAlpha = map(c, 0, this.linesBetween, 1, 0) 
            this.ctx.moveTo(this.x,this.y);
            this.ctx.lineTo(ball.x, ball.y);
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
        }
    }

    edges(w,h) {
        if(this.y <= 0) {
            this.y = 0;
            this.vY *= -1;
        }
        else if(this.y >= h) {
            this.y = h;
            this.vY *= -1;
        }
        if(this.x <= 0) {
            this.x = 0;
            this.vX *= -1;
        }
        else if(this.x >= w ) {
            this.x = w;
            this.vX *= -1;
        }
    }

    update() {
        this.x += this.vX;
        this.y += this.vY;
    }

    show() {
        if(this.r < 0.5 ) return;
        this.ctx.beginPath();
        this.ctx.globalAlpha = 0.2;
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();     
        this.ctx.globalAlpha = 1;
    }

    setRandomVelocity() {
        this.vX = random(-1,1)
        this.vY = random(-1,1)
    }

    setRandomPosition(w,h) {
        this.x = random(w)
        this.y = random(h)
    }
}
