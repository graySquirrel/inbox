const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //caps because its a constructor

// make an instance
// ganache is the network to connect the instance to
const web3 = new Web3(ganache.provider());
