const Block = require('./block');
const { DIFFICULTY }=require('./config');
describe ('block',()=>{
    let data,lastBlock,block;
    beforeEach(() =>{
         data='bar';
         lastBlock =Block.genesis();
         block=Block.mineBlock(lastBlock,data);
    });
            it('sets the "data" to match the input',()=>{
                expect(block.data).toEqual(data);
    });
             it('sets the "lasthash" to match the hash of the lat block',()=>{
                expect(block.lastHash).toEqual(lastBlock.hash);
    });
            it('generates the hash that matches the added difficulty',()=>{
                expect(block.hash.substring(0,DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
            });
});