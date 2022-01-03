import BaseScene from "./BaseScene"

class MenuScene extends BaseScene {
    constructor(config) {
        super('MenuScene', config)

        this.menu = [
            { scene: 'PlayScene', text: 'Play' },
            { scene: 'ScoreScene', text: 'Score' },
            { scene: null, text: 'Exit' }
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
    }
}

export default MenuScene