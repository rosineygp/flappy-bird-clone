import BaseScene from "./BaseScene"

class MenuScene extends BaseScene {
    constructor(config) {
        super('MenuScene', config)

        this.menu = [
            { scene: 'PlayScene', text: 'Play' },
            { scene: 'ScoreScene', text: 'Score' }
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
                item.scene && this.scene.start(item.scene)

                if (item.text === "Exit"){
                    this.game.destroy(true)
                }
            })
    }
}

export default MenuScene