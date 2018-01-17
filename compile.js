const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// npm install --save solc
// npm install --save mocha ganache-cli web3@1.0.0-beta.26

//console.log(solc.compile(source, 1));
// can see if powershell: node ./compile.js
module.exports = solc.compile(source, 1).contracts[':Inbox'];
