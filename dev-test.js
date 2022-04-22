const Block = require('./blockchain/block');/*to access the exported module of the blockc class we will use 'require'*/
const fooBlock=Block.mineBlock(Block.genesis(),'foo');
console.log(fooBlock.toString());

