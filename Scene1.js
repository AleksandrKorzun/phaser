const clth = {
  Dress: ["Dress1", "Dress2"],
  Handbag: ["Handbag1", "Handbag2"],
  Accessory: ["Accessory1", "Accessory2", "Accessory3"],
  Place: ["place1", "place2"],
}


class Scene1 extends Phaser.Scene {
  constructor() {
    super("Game");
    this.choice = [];
    this.cardBG = [];
  }
  preload(){
    this.load.image("background", "assets/backGroundRoom.png");
    this.load.image("blackBG", "assets/blackBG.png");
    this.load.image("woman", "assets/woman.png");
    this.load.image("man", "assets/man.png");
    this.load.image("paulText", "assets/PaulTextStart.png");
    this.load.image("lexyText", "assets/LexyTextStart.png");
    this.load.image("backgroundplace1", "assets/backGroundIsland.png")
    this.load.image("backgroundplace2", "assets/backGroundSea.png")
    this.load.image("bgText", "assets/bgText.png")
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
  create(){
    this.createBackground()
    this.createСharacter()
    this.createTextAnimation("paulText", 500);
    this.deleteTextAnimation("paulText",2000);
    this.createTextAnimation("lexyText", 3500);
    this.deleteTextAnimation("lexyText",5000);

    setTimeout(()=>{
      this.blackBG.visible = false;
      this.tweens.add({
        targets: this.woman,
        scaleX: 1,
        scaleY: 1,
        easy : "Linear",
        duration: 200,
      });
      this.createChoice();
    },5500);
    
  }
  createСharacter(){
    this.man = this.add.sprite(0, 6, "man").setOrigin(0, 0);
    this.woman = new Woman(this, {x: -520, y:6})
    this.woman.scaleX = 1.2;
    this.woman.scaleY = 1.2;
    this.man.depth = 16;
    this.paulText = this.add.sprite(533, 522, "paulText").setOrigin(1, 0.5);
    this.paulText.scaleX = 0;
    this.paulText.scaleY = 0;
    this.paulText.depth = 18;
    this.lexyText = this.add.sprite(70, 400, "lexyText").setOrigin(0, 0);
    this.lexyText.scaleX = 0;
    this.lexyText.scaleY = 0;
    this.lexyText.depth = 18;
  }
  createBackground(){
    this.gameBG = this.add.sprite(0, 0, "background").setOrigin(0, 0);
    this.blackBG = this.add.sprite(0, 0, "blackBG").setOrigin(0, 0);
  };
  changeBackground(value) {
    this.gameBG.setTexture(this.gameBG.texture.key + value)
  }
  createTextAnimation(item, delay) {
    this.tweens.add({
      targets: this[item],
      scaleX: 1,
      scaleY: 1,
      easy : "Linear",
      duration: 200,
      delay,
    })
  };
  deleteTextAnimation(item, delay) {
    this.tweens.add({
      targets: this[item],
      scaleX: 0,
      scaleY: 0,
      easy : "Linear",
      duration: 200,
      delay,
      onComplete: this.moveWomen()
    })
  };
  moveWomen() {
    this.tweens.add({
      targets: this.woman,
      x: 60,
      easy : "Linear",
      duration: 600,
      delay: 3000,
      onComplete: this.moveMan(),
    })
  }
  moveMan(){
    this.tweens.add({
      targets: this.man,
      x: 600,
      easy : "Linear",
      delay: 3000,
      duration: 600,
    })
  };
  createBgText(){
    this.bgText = this.add.sprite(0, 10, "bgText").setOrigin(0, 0);
    this.bgText.x = (this.sys.game.config.width - this.bgText.width) / 2;
  };
  deleteBgText(){
    this.bgText.visible = false;
  };
  createTextChoice(value){
    this.textChoice = this.add.text(0, 20, `Choose your ${value.toLowerCase()}`, {
      fontFamily: 'Nunito Sans',
      fontStyle: "normal",
      fontSize: "24px",
      color: "#FFFFFF",
    })
    this.textChoice.x = (this.sys.game.config.width - this.textChoice.width) / 2;
  };
  deleteTextChoice(){
    this.textChoice.visible = false;
  };
  createChoice() {
    this.createBgText()
    for (const key of Object.keys(clth)) {
      if (this.woman.texture.key.includes(key)) continue
      this.createTextChoice(key)
      clth[key].map((item, idx)=> {
        const position = this.getChoicePosition(item, idx)
        if (key === "Accessory") {
          if (this.woman.texture.key.includes("Dress1")) {
            clth[key].splice(2, 1)
          } else {
            clth[key].splice(1, 1)
            }
          } 
          if (key === "Place") {
            this.choice[idx] =  new Choice(this, {x: position.clothesX, y: position.clothesY}, item).setInteractive().on("pointerdown", ()=>{
              this.createAnimationTap(idx)
              setTimeout(() => {
                this.deletechoice()
                this.deleteTextChoice()
                this.deleteBgText()
                this.changeBackground(item)
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
      break
    }
  }
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
  }
  
  getChoicePosition(clothes, idx){
    const distanceCards = 20
    const offsetx = 40;
    const offsety = 564;
    const clothesWidth = this.game.textures.list[clothes].source[0].width;
    const clothesHeight = this.game.textures.list[clothes].source[0].height;
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
  update(){
    if (this.gameBG.texture.key.includes("place")){
      if (this.woman.x < -30) {
        this.woman.x += 10
      }
      if (this.man?.x > 100) {
        this.man.x -=10
      }
    }
  }
}
