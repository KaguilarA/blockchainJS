const chain = require('./classes/chain');


const chainTest = new chain(`init`, `0000`);

chainTest.addBlock(`second value`);

chainTest.addBlock(`third value`);

chainTest.addBlock(`fourth value`);

console.log('here, it works: ', chainTest.isValid());

console.log(`-------------`);

chainTest.forceOverwrite();

console.log('here, isnt working: ', chainTest.isValid());