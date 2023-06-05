document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', startGame);
  });  

function startGame() {
  // Redirect to game.html when the button is clicked
  window.location.href = 'game.html';
}



// MAIN GAME , GAMEPLAY STUFF


class Character {
    constructor(imageId, health, elementId, healthBarId) {
      this.image = document.getElementById(imageId);
      this.health = health;
      this.element = document.getElementById(elementId);
      this.healthBar = document.getElementById(healthBarId);
      this.activeWord = null;
    }
  
    shoot(bullet, words) {
      this.health--;
      this.updateHealthBar();
      this.showWord(words);
      this.createBullet();
    }
  
    updateHealthBar() {
      this.healthBar.style.width = `${this.health * 5}px`;
    }
  
    showWord(words) {
      const word = words[Math.floor(Math.random() * words.length)];
      const wordElement = document.createElement('div');
      wordElement.innerText = word;
      wordElement.className = 'word tilt-animation';
  
      if (this.activeWord) {
        this.element.removeChild(this.activeWord);
      }
  
      this.activeWord = wordElement;
      this.element.appendChild(wordElement);
  
      setTimeout(() => {
        this.element.removeChild(wordElement);
        this.activeWord = null;
      }, 2000);
    }
  
    createBullet() {
        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        this.element.appendChild(bullet);
      
        let topPosition = this.element === document.getElementById('player') ? 10 : -10;
      
        const moveBullet = setInterval(() => {
          topPosition = this.element === document.getElementById('player') ? topPosition - 5 : topPosition + 5;
          bullet.style.right = `${topPosition}px`;
      
          // Check for collision with enemies
          const enemies = document.getElementsByClassName('enemy');
          for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (isColliding(bullet, enemy)) {
              this.element.removeChild(bullet);
              clearInterval(moveBullet);
              enemy.remove();
              break;
            }
          }
      
          if (topPosition > window.innerHeight || topPosition < 0) {
            this.element.removeChild(bullet);
            clearInterval(moveBullet);
          }
        }, 10);
      }      
    }      
  

// Enemy stuff


  class Enemy {
    constructor(imageId, containerId) {
      this.image = document.getElementById(imageId);
      this.container = document.getElementById(containerId);
      this.createEnemy();
    }
  
    createEnemy() {
      const enemy = document.createElement('div');
      enemy.className = 'enemy';
      this.container.appendChild(enemy);
  
      const initialPosition = window.innerWidth - 50;
      let leftPosition = initialPosition;
      let direction = -1;
  
      const moveEnemy = setInterval(() => {
        enemy.style.left = `${leftPosition}px`;
        leftPosition += direction * 5;
  
        if (leftPosition < 0 || leftPosition > initialPosition) {
          direction *= -1;
        }
  
        if (isColliding(player.image, enemy)) {
          player.health--;
          player.updateHealthBar();
          if (player.health <= 0) {
            clearInterval(moveEnemy);
            enemy.remove();
            alert('Game Over');
          }
        }
      }, 50);
    }
  }
  
  const player = new Character('player-image', 20, 'player', 'player-health');
  
  const playerControls = {
    position: { x: 0, y: 0 },
    speed: 10,
    keysPressed: {},
  
    handleKeyDown(event) {
      playerControls.keysPressed[event.key] = true;
    },
  
    handleKeyUp(event) {
      delete playerControls.keysPressed[event.key];
    },
  
    updatePosition() {
      if (playerControls.keysPressed['w'] || playerControls.keysPressed['ArrowUp']) {
        playerControls.position.y -= playerControls.speed;
      }
      if (playerControls.keysPressed['s'] || playerControls.keysPressed['ArrowDown']) {
        playerControls.position.y += playerControls.speed;
      }
      if (playerControls.keysPressed['a'] || playerControls.keysPressed['ArrowLeft']) {
        playerControls.position.x -= playerControls.speed;
      }
      if (playerControls.keysPressed['d'] || playerControls.keysPressed['ArrowRight']) {
        playerControls.position.x += playerControls.speed;
      }
  
      player.element.style.transform = `translate(${playerControls.position.x}px, ${playerControls.position.y}px)`;
    },
  
    shoot() {
      player.shoot('bullet.png', ['OH NOOO!', 'OOO MY GOD!', 'HOLY SHIT!']);
    }
  };
  
  window.addEventListener('keydown', (event) => playerControls.handleKeyDown(event));
  window.addEventListener('keyup', (event) => playerControls.handleKeyUp(event));
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      playerControls.shoot();
    }
  });
  
  setInterval(() => playerControls.updatePosition(), 10);
  
  console.log('Game started!');  