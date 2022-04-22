const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY}=require('./config');
class Block {
      constructor(timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce; 
    }
// using'this' it binds the input with a property on the block//
//'this' is used to create a unique instance of the class block// 
//tostring is used to return the specific instance of te class//
toString() { 
    return `Block - 
          Timestamp : ${this.timestamp}
          Last Hash : ${this.lastHash.substring(0, 10)}
          Hash      : ${this.hash.substring(0, 10)}
          Data      : ${this.data}
          Nonce     : ${this.nonce}`;
            }
// here i have used es6 interpolatation within.meaning we can display data within 
//it and can isert it too //
      static genesis() {
        return new this('Genesis time','----','f1r57-h45h0',[],0); 
      }
//f1r57-h45h0 here f1r57 is leetspeak for first and then h45h0//
//genesis block is known as the begining of the blobkachain//
//containing dummy values for the timstamp,hash,lasthash and//
//data values//
      static mineBlock(lastBlock,data){ 
        let hash,timestamp;
        const lastHash=lastBlock.hash;
        let nonce=0;
        do{
          nonce++;
          const timestamp=Date.now();
          hash=Block.hash(timestamp,lastHash,data,nonce);
        }
        while(hash.substring(0,DIFFICULTY)!=='0'.repeat(DIFFICULTY));
        return new this(timestamp,lastHash,hash,data,nonce);
      }
//using static we enable to call the genesis function// 
//without having to make a new instance of the block //

      static hash(timestamp,lastHash,data,nonce){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
      }
//this will retun the static value of the block//
      
      static blockHash(block){
        const{timestamp,lastHash,data,nonce}=block;
        return Block.hash(timestamp,lastHash,data,nonce);
      }
//this will return the static value of the hash//
    }
      module.exports = Block;
//to share the context of the class to other files by//
//exporting it as a module//