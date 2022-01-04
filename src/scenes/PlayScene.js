import BaseScene from "./BaseScene"

const PIPES_TO_RENDER = 4

class PlayScene extends BaseScene {
    constructor(config) {
        super('PlayScene', config)

        this.initialBirdPosition = {
            x: 80,
            y: 300
        }
        this.bird = null
        this.flapVelocity = 250
        this.pipes = null

        // this.pipeVerticalDistanceRange = [150, 250]
        // this.pipeHorizontalDistanceRange = [500, 550]

        this.score = 0
        this.scoreText = ''

        this.isPaused = false

        this.currentDifficulty = 'easy'
        this.difficulties = {
            'easy': {
                pipeHorizontalDistanceRange: [300, 350],
                pipeVerticalDistanceRange: [150, 200]
            },
            'normal': {
                pipeHorizontalDistanceRange: [280, 330],
                pipeVerticalDistanceRange: [140, 190]
            },
            'hard': {
                pipeHorizontalDistanceRange: [250, 310],
                pipeVerticalDistanceRange: [120, 170]
            }
        }
    }

    create() {
        super.create()
        this.createBird()
        this.createPipes()
        this.createColliders()
        this.createScore()
        this.createPause()
        this.handleInputs()
        this.listenToEvents()
    }

    update() {
        this.checkGameStatus()
        this.recyclePipes()
    }

    createBird() {
        this.bird = this.physics.add.sprite(this.config.startPosition.x,
            this.config.startPosition.y,
            'bird')
            .setFlipX(true)
            .setScale(3)
            .setOrigin(0)
        this.bird.body.gravity.y = 400
        this.bird.setCollideWorldBounds(true)
    }

    createPipes() {
        this.pipes = this.physics.add.group()

        for (let i = 0; i < PIPES_TO_RENDER; i++) {
            const upperPipe = this.pipes.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 1)
            const lowerPipe = this.pipes.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 0)
            this.placePipe(upperPipe, lowerPipe)
        }

        this.pipes.setVelocityX(-200)
    }

    createColliders() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this)
    }

    createScore() {
        this.score = 0
        const bestScore = localStorage.getItem('bestScore')
        this.scoreText = this.add.text(16, 16, `Score: ${0}`, { fontSize: '32px', fill: '#000' })
        this.scoreBestText = this.add.text(16, 52, `Best Score: ${bestScore || 0}`, { fontSize: '18px', fill: '#000' })
    }

    createPause() {
        this.isPaused = false
        const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
            .setInteractive()
            .setScale(3)
            .setOrigin(1)

        pauseButton.on('pointerdown', () => {
            this.isPaused = true
            this.physics.pause()
            this.scene.pause()
            this.scene.launch('PauseScene')
        })
    }

    handleInputs() {
        this.input.on('pointerdown', this.flap, this)
    }

    listenToEvents() {

        if (this.pauseEvent) {
            return
        }

        this.pauseEvent = this.events.on('resume', () => {
            this.initialTime = 3
            this.countDownText = this.add.text(...this.screenCenter, `Fly in: ${this.initialTime}`, this.fontOptions)
                .setOrigin(.5)
            this.timeEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countDown,
                callbackScope: this,
                loop: true
            })
        })
    }

    countDown() {
        this.initialTime--
        this.countDownText.setText(`Fly in: ${this.initialTime}`)

        if (this.initialTime < 1) {
            this.countDownText.setText('')
            this.physics.resume()
            this.timeEvent.remove()
            this.isPaused = false
        }
    }

    checkGameStatus() {
        if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
            // console.log('game over')
            this.gameOver()
        }
    }

    placePipe(upperPipe, lowerPipe) {

        const difficulty = this.difficulties[this.currentDifficulty]
        const rightMostX = this.getRightMostPipe()

        const pipeVerticalDistance = Phaser.Math.Between(...difficulty.pipeVerticalDistanceRange)
        const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - pipeVerticalDistance)
        const pipeHorizontalDistance = Phaser.Math.Between(...difficulty.pipeHorizontalDistanceRange)

        upperPipe.x = rightMostX + pipeHorizontalDistance
        upperPipe.y = pipeVerticalPosition

        lowerPipe.x = upperPipe.x
        lowerPipe.y = upperPipe.y + pipeVerticalDistance
    }


    recyclePipes() {
        const tempPipes = []

        this.pipes.getChildren().forEach(pipe => {
            if (pipe.getBounds().right <= 0) {
                tempPipes.push(pipe)
                if (tempPipes.length === 2) {
                    this.placePipe(...tempPipes)
                    this.increaseScore()
                    this.saveBestScore()
                    this.increaseDifficulty()
                }
            }
        })
    }

    increaseDifficulty() {
        if (this.score === 4) {
            this.currentDifficulty = 'normal'
        }

        if (this.score === 8) {
            this.currentDifficulty = 'hard'
        }
    }

    getRightMostPipe() {
        let rightMostX = 0

        this.pipes.getChildren().forEach(function (pipe) {
            rightMostX = Math.max(pipe.x, rightMostX)
        })

        return rightMostX
    }

    saveBestScore() {
        const bestScoreText = localStorage.getItem('bestScore')
        const bestScore = bestScoreText && parseInt(bestScoreText, 10)

        if (!bestScore || this.score > bestScore) {
            localStorage.setItem('bestScore', this.score)
        }
    }

    gameOver() {
        this.physics.pause()
        this.bird.setTint(0xEE4824)

        this.saveBestScore()

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.restart()
            },
            loop: false
        })
    }

    flap(bird) {
        if (!this.isPaused){
            this.bird.body.velocity.y = -this.flapVelocity
        }
    }

    increaseScore() {
        this.score++
        this.scoreText.setText(`Score: ${this.score}`)
    }
}

export default PlayScene