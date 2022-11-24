let board = document.querySelector('.board');
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();

let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

requestAnimationFrame(() => {
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
    dxd = Math.floor(Math.random() * 2);
    dyd = Math.floor(Math.random() * 2);
    moveBall(dx, dy, dxd, dyd);
});

function moveBall(dx, dy, dxd, dyd) {
    if (ball_coord.top <= board_coord.top) {
      dyd = 1;
    }
    if (ball_coord.bottom >= board_coord.bottom) {
      dyd = 0;
    }
     {
      dxd = 1;
      dx = Math.floor(Math.random() * 4) + 3;
      dy = Math.floor(Math.random() * 4) + 3;
    }
    if (
      ball_coord.right >= paddle_2_coord.left &&
      ball_coord.top >= paddle_2_coord.top &&
      ball_coord.bottom <= paddle_2_coord.bottom
    ) {
      dxd = 0;
      dx = Math.floor(Math.random() * 4) + 3;
      dy = Math.floor(Math.random() * 4) + 3;
    }
    if (
      ball_coord.left <= board_coord.left ||
      ball_coord.right >= board_coord.right
    ) {  
      ball_coord = initial_ball_coord;
      ball.style = initial_ball.style;
      return;
    }
    ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
    ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
    ball_coord = ball.getBoundingClientRect();
    requestAnimationFrame(() => {
      moveBall(dx, dy, dxd, dyd);
    });
}
