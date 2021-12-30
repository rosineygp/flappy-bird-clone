import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene"

const WIDHT = 800
const HEIGHT = 600
const BIRD_POSITION = {
  x: HEIGHT * 0.1,
  y: HEIGHT / 2
}
const SHARED_CONFIG = {
  width: WIDHT,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 200 },
      debug: true

    }
  },
  scene: [new PlayScene(SHARED_CONFIG)]
};

new Phaser.Game(config);
