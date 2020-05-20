var config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
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
}

var game = new Phaser.Game(config)

function preload() {
    this.load.image('star', 'assets/star16.png')
    this.load.image('explosion', 'assets/explosion.png')
    this.load.image('enemy', 'assets/enemy.png')
    this.load.image('ship', 'assets/spaceship.png')
    this.load.image('laser', 'assets/laser.png')
}

var score = 0
var lives = 3

function create() {
    stars = []
    for (let i = 0; i < 10; i++) {
        stars.push(
            this.physics.add.group({
                key: 'star',
                repeat: 22,
                setXY: {x: 12, y: i * 100, stepX: 70},
                setCollideWorldBounds: true,
                velocityY: 30,
            })
        )
    }

    ship = this.physics.add.sprite(800, 600, 'ship')
    cursors = this.input.keyboard.createCursorKeys()
    scoreText = this.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#fff',
    })
    livesText = this.add.text(1350, 16, 'lives: 3', {
        fontSize: '32px',
        fill: '#fff',
    })
    timedEvent = this.time.addEvent({delay: 1000, callback: increaseScore, repeat: -1});
    timedEvent = this.time.addEvent({
        delay: 2000,
        callback: () => createEnemy(this.physics),
        repeat: -1,
        callbackScope: this
    })
    enemies = this.physics.add.group()
    laserGroup = this.physics.add.group()
}

let lasers = 0

function update() {
    moveShip()
    if (cursors.space.isDown && lasers === 0) {
        lasers += 1
        this.laser = this.physics.add.sprite(ship.x, ship.y, 'laser')
        laserGroup.add(this.laser)
        this.laser.setScale(0.1)
        this.laser.setVelocityY(-1000)
        this.laser.setCollideWorldBounds(true)
    }
    if (this.laser && this.laser.y < 50) {
        this.laser.disableBody(true, true)
        this.laser.destroy(true)
        this.laser = null
        lasers -= 1
    }

    stars.forEach((s) => {
        s.children.iterate((star) => {
            if (star.y > 1000) {
                star.setY(Math.random() * 50)
            }
        })
    })
}

function moveShip() {
    if (cursors.left.isDown) {
        ship.setVelocityX(-520)
    } else if (cursors.right.isDown) {
        ship.setVelocityX(520)
    } else {
        ship.setVelocityX(0)
    }

    if (cursors.down.isDown) {
        ship.setVelocityY(320)
    } else if (cursors.up.isDown) {
        ship.setVelocityY(-320)
    } else {
        ship.setVelocityY(0)
    }
}

const shootLaser = () => {
}

function increaseScore() {
    score = score + 1;
    scoreText.setText("score: " + score)
}

const createEnemy = (physics) => {
    let enemy = physics.add.sprite(Math.random() * 1920, 50, 'enemy')
    enemy.setScale(0.3)
    enemy.setVelocityY(Math.random() * 300)
    enemy.setVelocityX(Math.random() * 300)
    enemy.body.setCollideWorldBounds(true)
    enemy.body.bounce.setTo(0.9, 0.9)
    physics.add.collider(ship, enemy, () => touchEnemy(enemy,physics), null, this);
    physics.add.collider(this.laserGroup, enemy, () => destroy(enemy), null);
}

const touchEnemy = (enemy,physics) => {
    enemy.disableBody(true,true)
    lives-=1

    livesText.setText("lives: " + lives)
    if(lives===0) {
        physics.add.sprite(ship.x,ship.y,'explosion')
        ship.disableBody(true,true)
    }
}

function destroy(enemy) {
    enemy.disableBody(true, true)
    score = score + 10;
    scoreText.setText("score: " + score)
    if (this.laser) {
        this.laser.disableBody(true, true)
        this.laser.destroy(true)
        this.laser = null
        lasers -= 1
    }
}
