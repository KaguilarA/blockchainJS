const Block = require('./block');

class Chain {
  #blockChain = [];

  constructor(genesis, difficulty) {
    this.#blockChain.push(this.createFirstBlock(genesis));
    this.difficulty = difficulty;
  }

  get lastIndex() {
    return this.#blockChain.length - 1;
  }

  get lastBlock() {
    return this.#blockChain[this.lastIndex];
  }

  get nextIndex() {
    return this.lastBlock.index + 1;
  }

  addBlock(data) {
    const newBlock = new Block(this.nextIndex, data, this.lastBlock.hash);
    newBlock.mine(this.difficulty);
    console.log(`has created on try ${newBlock.nonce}`);
    this.#blockChain.push(newBlock);
  }

  createFirstBlock(genesis) {
    return new Block(0, genesis);
  }

  isValid() {
    let isValid = true;
    for (let i = 0; i < this.#blockChain.length; i++) {
      const previousBlock = this.#blockChain[i - 1];
      const currentBlock = this.#blockChain[i];

      if (previousBlock !== undefined) {

        if (currentBlock.previousHash !== previousBlock.hash) {
          isValid = false;
        }

        if (currentBlock.createHash() !== currentBlock.hash) {
          isValid = false;
        }
      }
    }

    return isValid;
  }

  // this method force an error

  forceOverwrite() {
    console.log('this.blockChain: ', this.#blockChain);
    this.#blockChain[1].data = `fake value !!`;
  }
}

module.exports = Chain;