class Woman extends Phaser.GameObjects.Sprite {
    constructor(scene, position) {
        super(scene, position.x, position.y, "woman")
        this.scene = scene;
        this.setOrigin(0, 0);
        this.scene.add.existing(this)
        console.log(this.texture.key)
    }
    changeClothes(value) {
        this.setTexture(this.texture.key + value)
    }
}