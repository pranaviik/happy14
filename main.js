const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SCALE = 4;
const PLAYER_SPEED = 150;
const JUMP_VELOCITY = -250;

const config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: "#1d1d1d",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

let player;
let cursors;

function preload() {
    this.load.spritesheet('tux', 'assets/tux.png', {
        frameWidth: 32,
        frameHeight: 32
    });
    this.load.image('cake', 'assets/cake.png');

}

function create() {
    setupAnimations.call(this);

    player = this.physics.add.sprite(GAME_WIDTH / 2, 496, 'tux');
    player.setScale(PLAYER_SCALE);
    player.setCollideWorldBounds(true);
    player.play('wave');

    const ground = this.add.rectangle(GAME_WIDTH / 2, 580, GAME_WIDTH, 40, 0x333333);
    this.physics.add.existing(ground, true);
    this.physics.add.collider(player, ground);

    this.cake = this.physics.add.image(100, 500, 'cake');
    this.cake.body.allowGravity = false;
    this.cake.setSize(100, 100).setOffset(78, 78);
    this.cake.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 200)
    );
    this.cake.setBounce(1);
    this.cake.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(player, this.cake, collectCake, null, this);
}


function update() {
    player.setVelocityX(0); 

    if (cursors.left.isDown) {
        player.setVelocityX(-PLAYER_SPEED);

    } else if (cursors.right.isDown) {
        player.setVelocityX(PLAYER_SPEED);
    }

    if (cursors.space.isDown && player.body.touching.down) {
        player.setVelocityY(JUMP_VELOCITY);
    }
}


function setupAnimations() {
    this.anims.create({
        key: 'wave',
        frames: this.anims.generateFrameNumbers('tux', { start: 40, end: 42 }),
        frameRate: 3,
        repeat: -1
    });
}

function collectCake(player, cake) {
    this.cameras.main.shake(200, 0.01);

    cake.disableBody(true, true);

    this.add.text(GAME_WIDTH / 2, 100, '🎉 Happy 14 33kc! 🎉', {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(400, 200, '🎂 Yumm! You got the cake!', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#ffcc00'
    }).setOrigin(0.5);

}

const game = new Phaser.Game(config);
