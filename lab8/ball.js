import { map, random } from "./index.js";

export default class Ball {
    constructor(id,x,y,r,ctx) {
        this.id = id
        this.x = x;
        this.y = y;
        this.r = r;
        this.m = 2*this.r;
        this.velX = 0;
        this.velY = 0;
        this.neighbourLine = 0;
        this.ctx = ctx;
    }

    edges(w,h) {
        if(this.y <= 0) {
            this.y = 0;
            this.velY *= -1;
        }
        else if(this.y >= h) {
            this.y = h;
            this.velY *= -1;
        }
        if(this.x <= 0) {
            this.x = 0;
            this.velX *= -1;
        }
        else if(this.x >= w ) {
            this.x = w;
            this.velX *= -1;
        }
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
    }

    show() {
        if(this.r < 0.5 ) return;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();        
    }

    setRandomVelocity() {
        this.velX = random(-1,1)
        this.velY = random(-1,1)
    }

    setRandomPosition(w,h) {
        this.x = random(w)
        this.y = random(h)
    }
}
