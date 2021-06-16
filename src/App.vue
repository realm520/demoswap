<template>
  <v-app>
    <div>
      <v-toolbar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>DemoSwap</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip v-if="isConnected">{{this.currentBalance}} ETH</v-chip>
        <v-chip v-if="isConnected">{{this.accounts[0]}}</v-chip>
        <v-btn @click="connectWallet" v-if="!isMetaMaskInstalled">
          Install Metamask
        </v-btn>
        <v-btn @click="connectWallet" v-if="isMetaMaskInstalled&&!isConnected">
          Connect MetaMask
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
import { ethers } from "ethers";

export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
  data: () => ({
    isConnected: false,
    currentAccount: '',
    currentBalance: '0',
    provider: null,
    accounts: []
  }),
  mounted() {
    if (this.isMetaMaskInstalled()){
      const { ethereum } = window
      ethereum.on('accountsChanged', this.handleNewAccounts)
      this.checkMetaMask()
    }
  },
  methods: {
    isMetaMaskInstalled() {
      const { ethereum } = window
      return Boolean(ethereum && ethereum.isMetaMask);
    },
    isMetaMaskConnected() {
      return this.accounts && this.accounts.length > 0
    },
    async checkMetaMask() {
      const { ethereum } = window
      try {
        const newAccounts = await ethereum.request({
          method: 'eth_accounts',
        })
        this.handleNewAccounts(newAccounts)
      } catch (err) {
        console.error('Error on init when getting accounts', err)
      }
    },
    async connectWallet() {
      console.log("connectting to wallet")
      const { ethereum } = window
      try {
        const newAccounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        this.handleNewAccounts(newAccounts)
      } catch (error) {
        console.error(error)
      }
    },
    async handleNewAccounts(newAccounts) {
      this.accounts = newAccounts
      if (this.isMetaMaskConnected()) {
        this.$store.commit('updateAccount', this.accounts)
        this.provider = new ethers.providers.Web3Provider(window.ethereum)
        let balance = await this.provider.getBalance(this.accounts[0])
        this.currentBalance = ethers.utils.formatEther(balance)
        this.isConnected = true
      }
    }
  }
};
</script>
