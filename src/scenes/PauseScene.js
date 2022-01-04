import BaseScene from "./BaseScene"

class PauseScene extends BaseScene {
    constructor(config) {
        super('PauseScene', config)

        this.menu = [
            { scene: 'PlayScene', text: 'Continue' },
            { scene: 'MenuScene', text: 'Exit' },
        ]
    }

    create() {
        super.create()
        this.createMenu(this.menu, this.setupMenuEvents.bind(this))
    }

    setupMenuEvents(item) {
        const textGO = item.textGO
        textGO.setInteractive()
            .on('pointerover', () => {
                textGO.setStyle({ fill: '#FF0' })
            })
            .on('pointerout', () => {
                textGO.setStyle({ fill: '#FFF' })
            })
            .on('pointerup', () => {
                if (item.scene && item.text === 'Continue') {
                    this.scene.stop()
                    this.scene.resume('PlayScene')
                } else {
                    this.scene.stop('PlayScene')
                    this.scene.start(item.scene)
                }
            })
    }
}

export default PauseScene