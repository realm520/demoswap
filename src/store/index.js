import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)
// var fs = require('fs');
// var jsonFile = "pathToYourJSONFile/project.json";
// var parsed= JSON.parse(fs.readFileSync(jsonFile));
// var abi = parsed.abi;
var erc20 = require('../contracts/ERC20.json');
var pair = require('../contracts/DaoswapPair.json');
var router = require('../contracts/DaoswapRouter.json');
var dspToken = require('../contracts/DSPToken.json');

// var YourContract= new web3.eth.Contract(abi, 0x12345678912345678912345678912345678912);
const state = {
  accounts: [],
  contracts: {
      tokenA: {
        address: '0x22d9a135818e0bF814D3b05B2064C7921AA4fb6f',
        abi: erc20.abi
      },
      tokenB: {
        address: '0xB1C40D243BE13D9912c641D890E72C856232fB18',
        abi: erc20.abi
      },
      weth: {
        address: '0xb54A5d7C3d175D08F28f98F01fC25E9c2991fC3A'
      },
      router: {
        address: '0x528775eEc8Aa6C6C759c8a2482420D1609a4BEDC',
        abi: router.abi
      },
      pairAB: {
        address: '0xb84CCb6Da7f3735edC03c81e05FA17e41364FBEd',
        abi: pair.abi
      },
      pairEthB: {
        address: '0xa39F36e73bf89A21897257B66A44B2426dA71952',
        abi: pair.abi
      },
      dao: {
        address: '0xA2849A3B487e4de9D03226ab84060209c329A875',
        abi: [
          "function getReward(address swap_addr)",
          "function predReward(address swap_addr) view returns (uint256)"
        ]
      },
      tokenDsp: {
        address: '0x36b484f9cC0698C2fEB4aa25Db0056E4FFe630Fc',
        abi: dspToken.abi
      },
      invitation: {
        address: '0xC732Ca61ac112a6Bcb78D972E91c4b113356B953',
        abi: [
            "function add_invitation_relation(address inviter)",
            "function getDelegate(address self) view returns (address)",
            "function getMembers(address addr) view returns (address[])"
        ]
      }
  },
  history: []
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
