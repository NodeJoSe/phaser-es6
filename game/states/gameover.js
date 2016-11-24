class GameOver extends Phaser.State {
  create() {
    const textStyle = {
      font: '45px Arial',
      alight: 'center',
      stroke: 'red',
      fill: 'red',
    };

    const title = this.game.add
      .text(this.game.world.centerX, this.game.world.centerY - 100, 'GAME OVER', textStyle);
    title.anchor.set(0.5);

    textStyle.font = '36px Arial';

    const instructions = this.game.add
      .text(this.game.world.centerX, this.game.world.centerY, '"s" key to play again', textStyle);
    instructions.anchor.set(0.5);

    const sKey = this.game.input.keyboard
      .addKey(Phaser.KeyCode.S);
    sKey.onDown.addOnce(() => this.game.state.start('play'));
  }
}

export default GameOver;
