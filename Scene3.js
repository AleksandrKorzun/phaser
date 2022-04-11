
// const clth = {
//   Dress: ["Dress1", "Dress2"],
//   Handbag: ["Handbag1", "Handbag2"],
//   Accessory: ["Accessory1", "Accessory2", "Accessory3"],
//   Place: ["place1", "place2"],
// }

class GameScene extends Phaser.Scene{
  constructor(){
    super("GameScene")
    this.choice = [];
    this.cardBG = []
  }
  preload(){
    this.load.image("background", "assets/backGroundRoom.png")
    this.load.image("backgroundplace1", "assets/backGroundIsland.png")
    this.load.image("backgroundplace2", "assets/backGroundSea.png")
    this.load.image("bgText", "assets/bgText.png")
    this.load.image("man", "assets/man.png")
    this.load.image("woman", "assets/woman.png")
    this.load.image("womanDress1", "assets/womandress1.png")
    this.load.image("womanDress1Handbag1", "assets/womandress1handbag1.png")
    this.load.image("womanDress1Handbag2", "assets/womandress1handbag2.png")
    this.load.image("womanDress1Handbag1Accessory1", "assets/womandress1handbag1accessory1.png")
    this.load.image("womanDress1Handbag2Accessory1", "assets/womandress1handbag2accessory1.png")
    this.load.image("womanDress1Handbag1Accessory2", "assets/womandress1handbag1accessory2.png")
    this.load.image("womanDress1Handbag2Accessory2", "assets/womandress1handbag2accessory2.png")
    this.load.image("womanDress2", "assets/womandress2.png")
    this.load.image("womanDress2Handbag1", "assets/womandress2handbag1.png")
    this.load.image("womanDress2Handbag2", "assets/womandress2handbag2.png")
    this.load.image("womanDress2Handbag1Accessory1", "assets/womandress2handbag1accessory1.png")
    this.load.image("womanDress2Handbag2Accessory1", "assets/womandress2handbag2accessory1.png")
    this.load.image("womanDress2Handbag1Accessory3", "assets/womandress2handbag1accessory3.png")
    this.load.image("womanDress2Handbag2Accessory3", "assets/womandress2handbag2accessory3.png")
    this.load.image("cardBg", "assets/cardBackground.png")
    this.load.image("Dress1", "assets/dress1.png")
    this.load.image("Dress2", "assets/dress2.png")
    this.load.image("Handbag1", "assets/handbag1.png")
    this.load.image("Handbag2", "assets/handbag2.png")
    this.load.image("Accessory1", "assets/accessory1.png")
    this.load.image("Accessory2", "assets/accessory2.png")
    this.load.image("Accessory3", "assets/accessory3.png")
    this.load.image("place1", "assets/place1.png")
    this.load.image("place2", "assets/place2.png")
    this.load.image("finalText", "assets/finalText.png")

  }
  create() {
    this.createBackground();
    this.createWoman();
    this.createChoice();
    
    
  }
  update(){
    if (this.woman.x < -30) {
      this.woman.x += 10
    }
    if (this.man?.x > 100) {
      this.man.x -=10
    }
  }
  createBackground(){
    this.gameBG = this.add.sprite(0, 0, "background").setOrigin(0, 0);
  }
  changeBackground(value) {
    this.gameBG.setTexture(this.gameBG.texture.key + value)
  }
  createWoman(){
    this.woman = new Woman(this, {x: 66, y:6})
  }
  createBgText(){
    this.bgText = this.add.sprite(0, 10, "bgText").setOrigin(0, 0);
    this.bgText.x = (this.sys.game.config.width - this.bgText.width) / 2;
  }
  deleteBgText(){
    this.bgText.visible = false;
  }
  createTextChoice(value){
    
    this.textChoice = this.add.text(0, 20, `Choose your ${value.toLowerCase()}`, {
      fontFamily: 'Nunito Sans',
      fontStyle: "normal",
      fontSize: "24px",
      color: "#FFFFFF",
    })
    this.textChoice.x = (this.sys.game.config.width - this.textChoice.width) / 2;
  }
  deleteTextChoice(){
    this.textChoice.visible = false;
  }
  createChoice() {
    this.createBgText()
    for (const key of Object.keys(clth)) {
      if (this.woman.texture.key.includes(key)) continue
      this.createTextChoice(key)
      clth[key].map((item, idx)=> {
        const position = this.getChoicePosition(item, idx)
        // this.cardBG[idx] = this.add.sprite(position.clothesBGX, position.clothesBGY, "cardBg").setOrigin(0.5, 0.5);
        if (key === "Accessory") {
          if (this.woman.texture.key.includes("Dress1")) {
            clth[key].splice(2, 1)
          } else {
            clth[key].splice(1, 1)
            }
          } 
          if (key === "Place") {
            this.choice[idx] =  new Choice(this, {x: position.clothesX, y: position.clothesY}, item).setInteractive().on("pointerdown", ()=>{
              // this.tapChoice(item,idx)
              this.createAnimationTap(idx)
              setTimeout(() => {
                this.deletechoice()
                this.deleteTextChoice()
                this.deleteBgText()
                this.changeBackground(item)
                // this.createChoice()
                this.createFinalScene()
              }, 400);
              this.createAnimationChoice(idx)
            })
          } else {
            this.choice[idx] =  new Choice(this, {x: position.clothesX, y: position.clothesY}, item).setInteractive().on("pointerdown", ()=>{
              this.createAnimationTap(idx)
              setTimeout(() => {
                this.woman.changeClothes(item)
                this.deletechoice()
                this.deleteTextChoice()
                this.deleteBgText()
                this.createChoice()
              }, 400);
            })
            this.createAnimationChoice(idx)
          }
        })
      console.log(this)
      break
    }
  }
  // tapChoice(item, idx){ 
  //   this.createAnimation(idx)
  //   this.woman.changeClothes(item)
  //   this.deletechoice()
  //   this.deleteTextChoice()
  //   this.deleteBgText()
  //   this.createChoice()
  // }
  deletechoice(){
    this.choice[0].visible = false
    this.choice[1].visible = false

  }
  createAnimationChoice(idx) {
    this.tweens.add({
      targets: this.choice[idx],
      scaleX: 1.05,
      scaleY: 1.05,
      easy : "Linear",
      duration: 200,
      yoyo: true,
      delay: 2000 + idx*1000,
      repeat: 100,
      repeatDelay: 2000,
    })
  }
  createAnimationTap(idx){

    this.cardAnim = this.tweens.add({
      targets: this.choice[idx],
      scaleX: 0.9,
      scaleY: 0.9,
      easy : "Linear",
      duration: 200,
      yoyo: true,
    })
    console.log(this.cardAnim)
  }
  
  getChoicePosition(clothes, idx){
    // const cardBGWidth = 250;
    // const cardBGHeight = 276;
    const distanceCards = 20
    const offsetx = 40;
    const offsety = 564;
    

    const clothesWidth = this.game.textures.list[clothes].source[0].width;
    const clothesHeight = this.game.textures.list[clothes].source[0].height;
    // const clothesX = (offsetx + ((clothesWidth + distanceCards) * idx + (cardBGWidth - clothesWidth) / 2));
    // const clothesY = (offsety + (cardBGHeight - clothesHeight) / 2);
    const clothesX = offsetx + ((clothesWidth + distanceCards) * idx + clothesWidth/2);
    const clothesY = offsety + clothesHeight/2;
    return {clothesX, clothesY}
  }
  createFinalScene(){
    this.man = this.add.sprite(this.sys.game.config.width, 6, "man").setOrigin(0, 0);
    this.woman.x = -this.woman.width;
    this.woman.depth = 1;
    this.textManFinal = this.add.sprite(533, 522, "finalText").setOrigin(1, 0.5);
    this.textManFinal.scaleX = 0;
    this.textManFinal.scaleY = 0;
    this.textManFinal.depth = 18;
    setTimeout(()=>{
      this.cardAnim = this.tweens.add({
        targets: this.textManFinal,
        scaleX: 1,
        scaleY: 1,
        easy : "Linear",
        duration: 200,
      })
    }, 1000);
  }
}

