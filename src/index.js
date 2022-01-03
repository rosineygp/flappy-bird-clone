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

const Scenes = [
  PreloadScene,
  MenuScene,
  PlayScene
]

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG))

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
  scene: initScenes()
};

new Phaser.Game(config);
