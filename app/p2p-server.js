const Websocket = require('ws');
const P2P_PORT =process.env.P2P_PORT || 5001;
//default port 5001
//const p2p port will check if the peer enviornmnet variable has been declared//
//we will have this string with multiple websocket addresses that can be used to connect to peers//

const peers=process.env.PEERS ? process.env.PEERS.split(','): [];
//split will return back all the ws address as an array//

class P2pServer{
    constructor(blockchan){
        this.sockets=[];
    }
//constructor will take blockchain as an input//
//why? coz we want to give each p2pserver a blockchain so that they can share their chain objects with each other// 
//this.sockets contain array of connected web socket servers// 
    listen(){
        const server=new  Websocket.Server({port: P2P_PORT});
        server.on('connection',socket=> this.connectSocket(socket));
        this.connectToPeers(); 
        console.log(`listening for peer to peer connections on: ${P2P_PORT}`);
    }
//listen will startup the server
//and const server need some options for the ports to be used so we pass an object//
//for our websocket server we have one option that is P2P_PORT so we will pass that//
//server.on is an event listener that will read the messages sent to ws server//
//so to listen the event that we want is connection so whenever a new socket is connected to the server//
//inorder to connect to that server we use call back fun 
connectToPeers(){
    peers.forEach(peer=>{
        const socket=new Websocket(peer);
        socket.on('open',()=>this.connectSocket(socket));
    });
}
//for each peer we will have address that will be like ws://localhost:5001
//with that address we will create a new module
//now once the socket is created to check if tits working on port 5001 or not we will have an socket.on event that will make sure of it

connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected');
    this.messageHandler(socket);
    this.sendChain(socket);
  }
//here we want to send the whole blockchain to user from p2pserer
//as a string using stringify method//

      messageHandler(socket) {
        socket.on('message', message => {
        const data = JSON.parse(message);
        this.blockchain.replaceChain(data);
      });
    }
}
module.exports = P2pServer;  