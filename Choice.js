class Choice extends Phaser.GameObjects.Sprite {
    constructor(scene, position, clothes) {
        super(scene, position.x, position.y, clothes)
        this.scene = scene;
        this.setOrigin(0.5, 0.5);
        this.scene.add.existing(this);
    }
    
}