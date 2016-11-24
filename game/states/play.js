import Wizard from '../sprites/wizard';

class Play extends Phaser.State {
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.wizard = new Wizard(this.game, 350, 300);
    this.game.add.existing(this.wizard);

    this.game.stage.backgroundColor = '#ffffff';
    this.game.input.keyboard.addKeyCapture([Phaser.KeyCode.SPACEBAR]);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    if (!this.startTime) this.startTime = Date.now();

    // 20 seconds to win
    if ((Date.now() - this.startTime) > 20000) {
      this.startTime = 0;
      this.game.state.start('gameover');
    }

    this.wizard.move(this.cursors);

    if (this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
      this.startTime = 0;
      this.game.state.start('victory');
    }
  }
}

export default Play;
