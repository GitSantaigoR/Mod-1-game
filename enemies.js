class Obstacle {
    constructor(container, obstacleWidth, obstacleHeight, obstacleImageSrc, speed) {
        this.container = container;
        this.element = document.createElement('img');
        this.element.className = 'obstacle'; 
        this.imageSrc = obstacleImageSrc; 
        this.element.src = this.imageSrc;

        
        this.width = obstacleWidth;
        this.height = obstacleHeight;
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.speed = speed
        
        this.top = 3;
        this.left = Math.floor(Math.random() * (container.offsetWidth - this.width));
        this.element.style.position = `absolute`
        this.element.style.top = this.top + "px" 
        this.element.style.left = this.left + "px" 
       
        container.appendChild(this.element);
    }


    changeImage(newImageSrc) {
        this.element.src = newImageSrc;
    }

   
    move() {
           
            this.top += 3.5; 
        
          
         
        
            this.updatePosition(); 
        }
    updatePosition() {
        this.element.style.left = this.left + 'px';
        this.element.style.top = this.top + 'px';
    }
}