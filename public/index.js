var config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image("star", "assets/star16.png");
    this.load.image("ship", "assets/spaceship.png");
    this.load.image("laser", "assets/laser.png");
}

function create() {
    stars = [];
    for (let i = 0; i < 10; i++) {
        stars.push(
            this.physics.add.group({
                key: "star",
                repeat: 22,
                setXY: {x: 12, y: i * 100, stepX: 70},
                setCollideWorldBounds: true,
            })
        );
    }

    ship = this.physics.add.sprite(800, 600, "ship");
    console.log(ship);
    cursors = this.input.keyboard.createCursorKeys();
}

let lasers = 0;


function update() {
    moveShip();
    if (cursors.space.isDown && lasers === 0) {
        lasers += 1
        this.laser = this.physics.add.sprite(ship.x, ship.y, "laser")
        this.laser.setScale(0.1)
        this.laser.setVelocityY(-700)
        this.laser.setCollideWorldBounds(true)
    }
    if (this.laser && this.laser.y < 50) {
        this.laser.disableBody(true, true);
        this.laser.destroy(true)
        this.laser = null
        lasers -= 1;
    }
}

const moveShip = () => {
    if (cursors.left.isDown) {
        ship.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        ship.setVelocityX(160);
    } else {
        ship.setVelocityX(0);
    }

    if (cursors.down.isDown) {
        ship.setVelocityY(160);
    } else if (cursors.up.isDown) {
        ship.setVelocityY(-160);
    } else {
        ship.setVelocityY(0);
    }
}

const shootLaser = () => {

}