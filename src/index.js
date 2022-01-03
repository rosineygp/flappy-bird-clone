import Phaser, { Scale } from "phaser";
import PreloadScene from "./scenes/PreloadScene"
import PlayScene from "./scenes/PlayScene"
import MenuScene from "./scenes/MenuScene"

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
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 200 },
      debug: true

    }
  },
  scene: [PreloadScene,
    new MenuScene(SHARED_CONFIG),
    new PlayScene(SHARED_CONFIG)]
};

new Phaser.Game(config);
