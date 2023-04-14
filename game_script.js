const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);

const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 525;

const playerImage = new Image();
playerImage.src = 'resources/player_probe.png';

const backgroundImage = new Image();
backgroundImage.src = 'resources/background.png';

const fireTop = new Image();
fireTop.src = 'resources/burn_north.png';

const fireBot = new Image();
fireBot.src = 'resources/burn_south.png';

var gap = 150;
var constant = 300 + gap;
var playerX=100;
var playerY=300;
var descent = 3;
//fire
var fire = [];

fire[0] = {
    x: canvas.width,
    y: 0
};

// controls
let score=0;
document.addEventListener("keyup",moveUp);

function moveUp(){
    playerY -=60;
}
  
function animate() {
    ctx.drawImage(backgroundImage,0,0);
    for(var i =0; i< fire.length; i++) {
        ctx.drawImage(fireTop,fire[i].x,fire[i].y);
        ctx.drawImage(fireBot,fire[i].x,fire[i].y+constant);
        fire[i].x-=4;

        if (fire[i].x ==200) {
            fire.push({
                x: canvas.width,
                y: Math.floor(Math.random()*300)-250
            });
        }
        if (fire[i].x ==20) {
            score++;
        }
         //detect collision
    if(playerX + 50 >= fire[i].x && playerX <= fire[i].x + 20&& (playerY <= fire[i].y + fireTop.height || playerY+50 >= fire[i].y+constant)  ) {
        location.reload();
    }
    }

    //detect collision
    // if(playerX + playerImage.width >= fire[i].x && playerX <= fire[i].x + fireTop.width && (playerY <= fire[i].y + fireTop.height || playerY+playerImage.height >= fire[i].y+constant)) {
    //     location.reload();
    // }

    ctx.fillStyle = "#fff";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,505);

    ctx.drawImage(playerImage, playerX, playerY,60,60);
    
    requestAnimationFrame(animate);
    playerY +=descent;
};

animate();
