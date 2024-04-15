import { SnowmanLogic } from "./snowman.js";

/** Class for updating DOM to reflect the current Snowman game state. */
class SnowmanUI {
  constructor(maxWrong = 5) {
    console.debug("Snowman UI");

    this.maxWrong = maxWrong;
    this.game = new SnowmanLogic(maxWrong);

    this.$keyboard = document.querySelector("#Snowman-keyboard");
    this.$word = document.querySelector("#Snowman-word");
    this.$image = document.querySelector("#Snowman-image");

    this.updateWord();
    this.addKeyboard();
  }

  /** Add keys to keyboard area and register single event listener for area.  */

  addKeyboard() {
    console.debug("addKeyboard");

    const $letters = [..."abcdefghijklmnopqrstuvwxyz"].map(
      letter => {
        const $letter = document.createElement("button");
        $letter.classList.add("letter");
        $letter.dataset.letter = letter;
        $letter.innerText = letter;
        return $letter;
      },
    );

    this.$keyboard.append(...$letters);
    this.$keyboard.addEventListener("click", this.handleGuess.bind(this));
  }

  /** Update guessed word on board. */

  updateWord() {
    console.debug("updateWord");

    this.$word.innerText = this.game.getGuessedWord();
  }

  /** Update image after a bad guess. */

  updateImage() {
    console.debug("updateImage");

    this.$image.src = `${this.game.numWrong}.png`;
  }

  /** Handle guessing a letter. */

  guessLetter(letter) {
    console.debug("guessLetter", letter);

    const isCorrect = this.game.guessLetter(letter);
    this.updateWord();
    this.updateImage();
  }

  /** Handle clicking a letter button: disable button & handle guess. */

  handleGuess(evt) {
    console.debug("handleGuess");

    if(!evt.target.matches(".letter")) return;

    const letter = evt.target.dataset.letter;
    this.guessLetter(letter);
    if(this.game.gameState !== "PLAYING"){
      this.displayResult();
    }
  }

  /** Appends msg to DOM about the result of the game. */

  displayResult(){
    const $endMsg = document.createElement('div');
    const $snowman = document.querySelector('#Snowman');
    const answer = this.game.answer;
    const result = this.game.gameState.toLowerCase();

    $endMsg.innerText = `You ${result}! The word was ${answer}!`;
    $snowman.appendChild($endMsg);
  }
}

export { SnowmanUI };
