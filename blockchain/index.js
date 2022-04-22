const Block = require('./block');//this will require the block class module
class Blockchain {
constructor() {
  this.chain = [Block.genesis()];//this is the chain for the blockchain class
}
addBlock(data) {
  const block = Block.mineBlock(this.chain[this.chain.length-1], data);//this will link the rest blocks with the genesis block//
  this.chain.push(block);
  return block;
}//add block gives the ability to add new block every time the transaction is mined
isValidChain(chain) {
  if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;//retuns false if the incoiming genesis block is not valid for this new chain
  //this was for the genesis block but the validation is to be done for each upcoming block in the chain so we will use loop from postn 1
  //iterate upto length of the chain
  for (let i=1; i<chain.length; i++) {
    const block = chain[i];//const block set equal to the current block found by ith element 
    const lastBlock = chain[i-1];//here if the postn of the block is 1 then i-1 is genesis block
    if (block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)) {
      return false;//the current blocks lasthash must match to the hash of the last block
    }
  } 
  return true;
}// isvalidchain validatees and solves the problem of forks
 // here to compare the 1st element of the incoming chain and a genesis block
 // we will compare their tostring versions
replaceChain(newChain) {
  if (newChain.length <= this.chain.length) {
    console.log('Received chain is not longer than the current chain.');
    return;
  } else if (!this.isValidChain(newChain)) {
    console.log('The received chain is not valid.');
    return;
  }
  console.log('Replacing blockchain with the new chain.');
  this.chain = newChain;
}
}
module.exports = Blockchain;