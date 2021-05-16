const SHA256 = require('crypto-js/sha256');

class Block {
  #creationDate = new Date();
  nonce = 0;

  constructor(index, data, previousHash = '') {
    this.index = index;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.createHash();
  }

  get hashData() {
    return this.index + this.#creationDate + this.data + this.previousHash + this.nonce;
  }

  createHash() {
    return SHA256(this.hashData).toString();
  }

  mine(difficulty) {
    while (!this.hash.startsWith(difficulty)) {
      this.nonce++;
      this.hash = this.createHash();
    }
  }
}

module.exports = Block;