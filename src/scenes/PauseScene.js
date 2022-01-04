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
                // item.scene && this.scene.start(item.scene)

                // if (item.text === "Exit"){
                //     this.game.destroy('MenuScene')
                // }

                console.log('pause')
            })
    }
}

export default PauseScene