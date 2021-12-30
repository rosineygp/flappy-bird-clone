
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

const VELOCITY = 400
const flapVelocity = 250
const pipeVerticalDistanceRange = [150, 250]
const initialBirdPosition = {
  x: config.width / 10,
  y: config.height / 2
}

let bird = null

let upperPipe = null
let lowerPipe = null

let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange)

new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'assets/sky.png')
  this.load.image('bird', 'assets/bird.png')
  this.load.image('pipe', 'assets/pipe.png')
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0)
  
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0)
  bird.body.gravity.y = VELOCITY

  upperPipe = this.physics.add.sprite(400, 100, 'pipe').setOrigin(0, 1)
  lowerPipe = this.physics.add.sprite(400, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0, 0)
  this.input.on('pointerdown', flap)
}

function update(){
  if (bird.y > config.height || bird.y < 0 - bird.height) {
    console.log('game over')
    restartBirdPosition()
  }
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x
  bird.y = initialBirdPosition.y
  bird.body.velocity.y = 0
}

function flap() {
  bird.body.velocity.y = -flapVelocity
}