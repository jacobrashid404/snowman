import { SnowmanLogic } from "./snowman.js";

/** Class for updating DOM to reflect the current Snowman game state. */
class SnowmanUI {
  constructor(maxWrong = 5) {
    console.debug("Snowman UI");

    this.maxWrong = maxWrong;
    this.game = new SnowmanLogic(maxWrong);
    this.boundHandleGuess = this.handleGuess.bind(this);


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
    this.$keyboard.addEventListener("click", this.boundHandleGuess);
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

  /** Handles guessing a letter and displays result if the game has ended*/

  guessLetter(letter) {
    console.debug("guessLetter", letter);

    const isCorrect = this.game.guessLetter(letter);
    this.updateWord();
    this.updateImage();

    if (this.game.gameState !== "PLAYING") {
      this.displayResult();
      this.$keyboard.removeEventListener("click", this.boundHandleGuess);
    }
  }

  /** Handle clicking a letter button: disable button & handle guess. */

  handleGuess(evt) {
    console.debug("handleGuess");

    if (!evt.target.matches(".letter")) return;

    evt.target.disabled = true;

    const letter = evt.target.dataset.letter;
    this.guessLetter(letter);
  }

  /** Appends msg to DOM about the result of the game. */

  displayResult() {
    const $endMsg = document.createElement('div');
    $endMsg.classList.add('Snowman-result-msg');
    const $snowman = document.querySelector('#Snowman');
    const answer = this.game.answer.toUpperCase();
    const result = this.game.gameState.toLowerCase();

    $endMsg.innerText = `You ${result}! The word was ${answer}!`;
    $snowman.appendChild($endMsg);
  }
}

export { SnowmanUI };
