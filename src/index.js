
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 200 },
      debug: true

    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const VELOCITY = 200
const PIPES_TO_RENDER = 4
const flapVelocity = 250
const pipeVerticalDistanceRange = [150, 250]
const initialBirdPosition = {
  x: config.width / 10,
  y: config.height / 2
}

let bird = null

let pipeHorizontalDistance = 0



new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'assets/sky.png')
  this.load.image('bird', 'assets/bird.png')
  this.load.image('pipe', 'assets/pipe.png')
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0)
  
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0)
  bird.body.gravity.y = 400

  for (let i = 0; i < PIPES_TO_RENDER; i++){
    const upperPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 1)
    const lowerPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 0)
    placePipe(upperPipe, lowerPipe)
  }


  this.input.on('pointerdown', flap)
}

function update(){
  if (bird.y > config.height || bird.y < 0 - bird.height) {
    console.log('game over')
    restartBirdPosition()
  }
}

function placePipe(upperPipe, lowerPipe){
  pipeHorizontalDistance += 400
  let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange)
  let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance)

  upperPipe.x = pipeHorizontalDistance
  upperPipe.y = pipeVerticalPosition

  lowerPipe.x = upperPipe.x
  lowerPipe.y = upperPipe.y + pipeVerticalDistance

  upperPipe.body.velocity.x = -VELOCITY
  lowerPipe.body.velocity.x = -VELOCITY
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x
  bird.y = initialBirdPosition.y
  bird.body.velocity.y = 0
}

function flap() {
  bird.body.velocity.y = -flapVelocity
}