class Player {
    constructor(gameScreen, x, y, width, height, imageSrc, audioSrc, secondaryAudio) {
        this.gameScreen = gameScreen;
        this.bulletArr =[]
        this.element = document.createElement('div');
        this.element.className = 'player';
        this.positionX = x
        this.positionY = y
        this.element.style.backgroundImage = `url(${imageSrc})`;
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = 'absolute';
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
        
        gameScreen.appendChild(this.element);

        this.speed = 20;

        this.audio = new Audio(audioSrc);

        this.secondaryAudio = new Audio(secondaryAudio)

        this.keyIsDown = {}; 

        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        setInterval(() => {
            
        this.bulletArr.forEach((bullet) => this.animateBullet(bullet))

        }, 16)
    }

    handleKeyDown(event) {

        console.log(this.positionX, this.positionY)
        if (event.code === 'ArrowLeft' && !this.keyIsDown['ArrowLeft']) {
            this.moveLeft();
            this.playAudio();
            this.keyIsDown['ArrowLeft'] = true;
        } else if (event.code === 'ArrowRight' && !this.keyIsDown['ArrowRight']) {
            this.moveRight();
            this.playAudio();
            this.keyIsDown['ArrowRight'] = true;
        } else if (event.code === 'ArrowUp' && !this.keyIsDown['ArrowUp']) {
            this.moveUp();
            this.playAudio();
            this.keyIsDown['ArrowUp'] = true;
        } else if (event.code === 'ArrowDown' && !this.keyIsDown['ArrowDown']) {
            this.moveDown();
            this.playAudio();
            this.keyIsDown['ArrowDown'] = true;
        } else if (event.code === 'Space' ) {
           this.playSecondaryAudio();
            this.shoot();
            this.keyIsDown['Space'] = true;    
        }
    }

    shoot() {

        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.positionY = this.positionY ;
        bullet.positionX = this.positionX + 55;
        bullet.style.width = '15px';
        bullet.style.height = '20px';
        bullet.style.position = 'absolute';
        bullet.style.left = bullet.positionX+ 'px'
        bullet.style.top = bullet.positionY+ 'px'
        bullet.style.backgroundImage = 'url("bullet_4.png")'
        bullet.style.backgroundSize = "cover"

        console.log(bullet.positionY)
        this.bulletArr.push(bullet);
        this.gameScreen.appendChild(bullet);
    }
    
    

    

    

    playAudio() {
        this.audio.currentTime = 0;
        this.audio.play();
    }

    playSecondaryAudio() {
        this.secondaryAudio.currentTime = 0;
        this.secondaryAudio.play();
    }

    handleKeyUp(event) {
        if (event.key === 'ArrowLeft') {
            this.keyIsDown['ArrowLeft'] = false;
        } else if (event.key === 'ArrowRight') {
            this.keyIsDown['ArrowRight'] = false;
        } else if (event.key === 'ArrowUp') {
            this.keyIsDown['ArrowUp'] = false;
        } else if (event.key === 'ArrowDown') {
            this.keyIsDown['ArrowDown'] = false;
        } else if (event.key === 'Space') {
            this.keyIsDown['Space'] = false;
        }
    }

    moveLeft() {
        this.positionX -= this.speed;
        if (this.positionX < 0) {
            this.positionX = 0;
        }
        this.element.style.left = this.positionX + 'px';
    }
    
    moveRight() {
        this.positionX += this.speed;
        const maxWidth = this.gameScreen.offsetWidth - this.element.offsetWidth;
        if (this.positionX > maxWidth) {
            this.positionX = maxWidth;
        }
        this.element.style.left = this.positionX + 'px';
    }
    
    moveUp() {
        this.positionY -= this.speed;
        if (this.positionY < 0) {
            this.positionY = 0;
        }
        this.element.style.top = this.positionY + 'px';
    }
    
    moveDown() {
        this.positionY += this.speed;
        const maxHeight = this.gameScreen.offsetHeight - this.element.offsetHeight;
        if (this.positionY > maxHeight) {
            this.positionY = maxHeight;
        }
        this.element.style.top = this.positionY + 'px';
    }

    animateBullet(bullet) {
        
        const bulletSpeed = 8;
        bullet.positionY -= bulletSpeed;
        bullet.style.left = bullet.positionX + 'px'
        bullet.style.top = bullet.positionY + 'px'


    }}
