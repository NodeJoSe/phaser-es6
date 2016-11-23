import Load from './states/load'
import Menu from './states/menu'
import Play from './states/play'
import GameOver from './states/gameover'
import Victory from './states/victory'

class Game extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.CANVAS, 'game', {
      create: () => {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

        this.state.add('load', Load)
        this.state.add('menu', Menu)
        this.state.add('play', Play)
        this.state.add('gameover', GameOver)
        this.state.add('victory', Victory)
        this.state.start('load')
      }
    })
  }
}

new Game()
