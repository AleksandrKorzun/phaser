
let config = {
  type: Phaser.AUTO,
  width: 600,
  height: 900,
  backgroundColor: '#fff',
  parent: 'phaser-example',
  scene: new Scene1(),
  pixelArt: true,
};

let game = new Phaser.Game(config);

