const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //caps because its a constructor

// make an instance
// ganache is the network to connect the instance to
const provider = ganache.provider();
const web3 = new Web3(provider);

// get the compiled contract interface (ABI) and bytecode
const { interface, bytecode } = require('../compile');

const INITIAL_STRING = 'Hi fucker!';
const NEW_MESSAGE = 'A New One';

let accounts;
let inbox;
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of the accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' });
  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
    console.log(inbox.options.address);
  });

  it('has the correct default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING)
  });

  it('can update message', async () => {
    await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, NEW_MESSAGE)
  });
})
