import Phaser from "phaser";
import logoImg from "./assets/logo.png";

// const config = {
//   type: Phaser.AUTO,
//   parent: "phaser-example",
//   width: 800,
//   height: 600,
//   scene: {
//     preload: preload,
//     create: create
//   }
// };

// const game = new Phaser.Game(config);

// function preload() {
//   this.load.image("logo", logoImg);
// }

// function create() {
//   const logo = this.add.image(400, 150, "logo");

//   this.tweens.add({
//     targets: logo,
//     y: 450,
//     duration: 2000,
//     ease: "Power2",
//     yoyo: true,
//     loop: -1
//   });
// }

function preload() {
  //this.load.image('bug1', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_1.png');
  this.load.image('bug1', 'src/assets/SimplePixelSpaceships_Astrod_4x_Size copy.png');
  //this.load.image('bug2', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_2.png');
  this.load.image('bug2', 'src/assets/SimplePixelSpaceships_Astrod2_4x_Size copy.png');
  //this.load.image('bug3', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_3.png');
  this.load.image('bug3', 'src/assets/SimplePixelSpaceships_Astrod3_4x_Size copy.png');
  this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
  //this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
  this.load.image('codey', 'src/assets/SimplePixel_Red_Spaceships_4x_Size copy.png');
  this.load.image('missile', 'src/assets/SimplePixelSpaceships_Missile_4x_Size copy.png');
}



const gameState = {
  score: 0
};

function create() {

  gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);

  const platforms = this.physics.add.staticGroup();

  platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();

  gameState.scoreText = this.add.text(195, 485, 'Score: 0', { fontSize: '15px', fill: '#000000' });

  gameState.player.setCollideWorldBounds(true);

  this.physics.add.collider(gameState.player, platforms);

  gameState.cursors = this.input.keyboard.createCursorKeys();

  const bugs = this.physics.add.group();

  function bugGen () {
    const xCoord = Math.random() * 450;
    bugs.create(xCoord, 10, 'bug1');
  }

  const bugGenLoop = this.time.addEvent({
    delay: 100,
    callback: bugGen,
    callbackScope: this,
    loop: true,
  });

  this.physics.add.collider(bugs, platforms, function (bug) {
    bug.destroy();
    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  })

  this.physics.add.collider(gameState.player, bugs, () => {
    bugGenLoop.destroy();
    this.physics.pause();
    this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
    this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });
    this.input.on('pointerup', () =>{
      gameState.score = 0;
    this.scene.restart();
    });
  })

  const missiles = this.add.group();

  function fireMissile() {
    
  };

}

function update() {
  if (gameState.cursors.left.isDown) {
    gameState.player.setVelocityX(-160);
  } else if (gameState.cursors.right.isDown) {
    gameState.player.setVelocityX(160);
  } else {
    gameState.player.setVelocityX(0);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 500,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    }
  },

  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);