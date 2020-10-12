import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  contracts: {
      tokenA: {
        address: '0x22d9a135818e0bF814D3b05B2064C7921AA4fb6f',
        abi: [
          "function balanceOf(address owner) view returns (uint256)",
          "function decimals() view returns (uint8)",
          "function symbol() view returns (string)",
          "function transfer(address to, uint amount) returns (boolean)",
          "function approve(address to, uint amount) returns (boolean)",
          "event Transfer(address indexed from, address indexed to, uint amount)"
        ]
      },
      tokenB: {
        address: '0xB1C40D243BE13D9912c641D890E72C856232fB18',
        abi: [
            "function balanceOf(address owner) view returns (uint256)",
            "function decimals() view returns (uint8)",
            "function symbol() view returns (string)",
            "function transfer(address to, uint amount) returns (boolean)",
            "function approve(address to, uint amount) returns (boolean)",
            "event Transfer(address indexed from, address indexed to, uint amount)"
        ]
      },
      weth: {
        address: '0xb54A5d7C3d175D08F28f98F01fC25E9c2991fC3A'
      },
      router: {
        address: '0x528775eEc8Aa6C6C759c8a2482420D1609a4BEDC',
        abi: [
          "function addLiquidity(address addrA, address addrB, uint amountA, uint amountB, uint minAmountA, uint minAmountB, uint deadline) returns (boolean)"
        ]
      },
      pairAB: {
        address: '0xb84CCb6Da7f3735edC03c81e05FA17e41364FBEd'
      },
      pairEthB: {
        address: '0xa39F36e73bf89A21897257B66A44B2426dA71952'
      },
      dao: {
        address: '0xc03c50A538C4336E2d7198824408459B0C7252ee'
      },
      tokenDsp: {
        address: '0xE0eb0Ee7b3849DEe344E1A9661A3bAA74220d8Ba'
      },
      invitation: {
        address: '0xC732Ca61ac112a6Bcb78D972E91c4b113356B953'
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