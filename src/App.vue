<template>
  <v-app>
    <div>
      <v-toolbar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>DemoSwap</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip v-if="isConnected">{{this.currentBalance}} ETH</v-chip>
        <v-chip v-if="isConnected">{{this.currentAccount}}</v-chip>
        <v-btn @click="connectWallet" v-if="!isConnected">
          Connect to a wallet
        </v-btn>
        <v-btn icon>
          <v-icon large color="orange">mdi-cogs</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon large color="orange">mdi-arrow-up-bold-box-outline</v-icon>
        </v-btn>
      </v-toolbar>
    <router-link to="/hello">Hello World </router-link>
    <router-link to="/swap">Swap </router-link>
    </div>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { BigNumber, ethers } from "ethers";

export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
  data: () => ({
    isConnected: false,
    currentAccount: '',
    currentBalance: 0,
    provider: null
  }),
  methods: {
    async connectWallet() {
      console.log("connectting to wallet")
      this.provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await this.provider.provider.request({method: 'eth_requestAccounts'})
      this.currentAccount = accounts[0]
      console.log(this.currentAccount)
      let balance = await this.provider.getBalance(this.currentAccount)
      this.currentBalance = balance.div(BigNumber.from('100000000000')).toNumber() / 1000000
      this.isConnected = true
      console.log(balance)
      // provider.request({method: 'eth_requestAccounts'})
      // const tx = signer.sendTransaction({
      //   to: "ricmoo.firefly.eth",
      //   value: ethers.utils.parseEther("1.0")
      // });
      // console.log(tx)
    }
  }
};
</script>
