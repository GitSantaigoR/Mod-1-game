let gameOverScreen = document.createElement('div')




document.getElementById("startButton").addEventListener("click", function () {
    document.getElementById("intro").style.display = "none";
    gameOverScreen.style.display = 'none'
    document.getElementById("gameScreen").style.display = "block";
    startGame();
});

let enemiesArr = [];

let score = 0;

let frames = 0

let timer = 30


const gameScreen = document.getElementById('gameScreen');



const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'scoreDisplay';
scoreDisplay.textContent = 'Score: 0';
gameScreen.appendChild(scoreDisplay);

let timerDisplay = document.createElement('h2')
timerDisplay.id = 'timer'
timerDisplay.style.zIndex = '100'
gameScreen.appendChild(timerDisplay)


function startGame() {
    const playerWidth = 153;
    const playerHeight = 289;
    const audioSrc = '/engine_heavy_loop.wav';
    const secondaryAudio = '/cannon_fire.ogg';

    const player = new Player(gameScreen, 800, 550, playerWidth, playerHeight, 'tank2.png', audioSrc, secondaryAudio);

    setInterval(() => {
        enemiesArr.forEach(enemy => {
            // console.log(enemy);
            enemy.move();
        });
    }, 11);


    function playCollisionSound() {
        const collisionSound = new Audio('/cannon_hit_ship_short.ogg'); 
        collisionSound.play();
    }

    setInterval(() => {
        enemiesArr.forEach((enemy, enemyIndex) => {
            player.bulletArr.forEach((bullet, bulletIndex) => {
                if (
                    bullet.positionX < enemy.left + enemy.width &&
                    bullet.positionX + parseInt(bullet.style.width) > enemy.left &&
                    bullet.positionY < enemy.top + enemy.height &&
                    bullet.positionY + parseInt(bullet.style.height) > enemy.top
                ) {
                 
                    console.log(`Collision detected between bullet ${bulletIndex} and enemy ${enemyIndex}`);

                    
                    playCollisionSound();
                   
                    bullet.remove();

                    player.bulletArr.splice(bulletIndex, 1);

                    const newImageSrc = '/footagecrate-simpleexplosion2@3X.png'; // Replace with the path to your new image
                    enemy.changeImage(newImageSrc);

                    setTimeout(() => {
                        enemy.element.remove()
                        enemiesArr.splice(enemyIndex, 1)
                    }, 200)

                    
                    score += 10;

                    
                    scoreDisplay.textContent = `Score: ${score}`;
                    scoreDisplay.style.fontSize = `${Math.min(18 + score / 10, 36)}px`; 
                    scoreDisplay.style.color = `rgb(${Math.min(255, score * 5)}, 0, 0)`; 
                    scoreDisplay.style.fontFamily =  "Stencil", 'sans-serif';
                }
            });
        });

       

    }, 16);

    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                player.moveLeft();
                break;
            case 'ArrowRight':
                player.moveRight();
                break;
            case 'ArrowUp':
                player.moveUp();
                break;
            case 'ArrowDown':
                player.moveDown();
                break;
            case 'Space':
                player.shoot();
                break;
            default:
                break;
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Space') {

        }
    });


    setInterval(function () {
      
        createObstacle();
    }, 2000);

    let screenProperties = gameScreen.getBoundingClientRect()

    console.log("Screen properties====>", screenProperties)

    setInterval(() => {
        enemiesArr.forEach((enemy, index) => {
            // console.log("line 140")
            if (enemy.top > screenProperties.bottom) {
                console.log("Enemy left screen!!!")
                score -= 10
                scoreDisplay.textContent = `Score: ${score}`;
                scoreDisplay.style.fontSize = `${Math.min(18 + score / 10, 36)}px`; 
                scoreDisplay.style.color = `rgb(${Math.min(255, score * 5)}, 0, 0)`; 
                scoreDisplay.style.fontFamily =  "Stencil", 'sans-serif';
                console.log("Enemy", enemy)
                enemy.element.remove()
                enemiesArr.splice(index, 1)
            }
        })
    }, 16)

    setInterval(() => {
        // console.log("line 155")
        frames++
        if (frames % 60 === 0) {
            timer--
            timerDisplay.innerHTML = `Time Left: ${timer}`;
            timerDisplay.style.left = '15px'
            timerDisplay.style.top = '40px'
            timerDisplay.style.width = '120px'
            timerDisplay.style.fontSize = `20px`; 
            timerDisplay.style.color = `black`; 
            timerDisplay.style.fontFamily =  "Stencil", 'sans-serif';
        }

        if (timer <= 0) {
            gameOver()
        }
    }, 16)
}

function createObstacle() {
    const obstacleContainer = document.getElementById('gameScreen');
    const obstacleImageSrc1 = '/k2.png';
    const obstacleImageSrc2 = '/R.png';

    const obstacleWidth1 = 160;
    const obstacleHeight1 = 250;

    const obstacleWidth2 = 254;
    const obstacleHeight2 = 210;


    const obstacleImageSrc = Math.random() < 0.5 ? obstacleImageSrc1 : obstacleImageSrc2;


    const obstacleWidth = obstacleImageSrc === obstacleImageSrc1 ? obstacleWidth1 : obstacleWidth2;
    const obstacleHeight = obstacleImageSrc === obstacleImageSrc1 ? obstacleHeight1 : obstacleHeight2;

    

    enemiesArr.push(new Obstacle(obstacleContainer, obstacleWidth, obstacleHeight, obstacleImageSrc))

}

function gameOver() {
    
    document.body.appendChild(gameOverScreen)
    gameScreen.style.display = 'none'
    gameOverScreen.style.display = 'flex'
    gameOverScreen.style.flexDirection = 'column'
    gameOverScreen.style.justifyContent = 'center'
    gameOverScreen.style.alignItems = 'center'

    let result = document.createElement('h2')
    result.style.marginTop = '30vh'
    result.style.padding = '0'
    gameOverScreen.appendChild(result)

    let overImage = document.createElement('img')
    overImage.src = 'gameover.png'
    overImage.id = 'over'
    // overImage.top = '600px'
    overImage.style.height = '60vh'
    overImage.style.marginTop = '-10vh'
    gameOverScreen.appendChild(overImage)

    
    if (score > 100) {
        result.innerHTML = `Your final score was ${score}, you win!`
    } else {
        result.innerHTML = 'Your enemies have defeated you.  You lose!'
    }
    

enemiesArr = [];
score = 0;
frames = 0
timer = 30

setTimeout(() => {
    window.location.reload()
}, 5000)

}