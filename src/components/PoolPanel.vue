<template>
<div>
  <v-card class="mx-auto my-12" width="500">
    <v-form v-if="!isShowPoolBtn">
    <v-container>
      <v-row>
      <v-col cols="12" md="4">
        <v-text-field :counter="10" label="0.0" required></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select label="ETH"></v-select>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-text-field :counter="10" label="0.0" required></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select label="BTC"></v-select>
      </v-col>
      </v-row>
    </v-container>
    <v-btn @click="addLiquidity">Confirm</v-btn>
    <v-btn @click="isShowPoolBtn=true;">Back</v-btn>
    </v-form>
    <v-card-actions>
      <v-btn @click="isShowPoolBtn=false;" v-if="isShowPoolBtn">Add Liquidity</v-btn>
    </v-card-actions>
    <v-card-text class="text--primary" v-if="isShowPoolBtn">
    <div>Your Liquidity:</div>
    <div>Connect your wallet to check your liquidity</div>
    </v-card-text>
  </v-card>
</div>
</template>
<script>

import { ethers } from "ethers";

export default {
  name: 'PoolPanel',
  data() {
      return {
        isShowPoolBtn: true,
        tokenA: null,
        tokenB: null,
        router: null,
        pair: null
      }
  },
  methods: {
    mounted: async function() {
      this.tokenA = new ethers.Contract(
          this.$store.contracts.tokenA.address,
          this.$store.contracts.tokenA.abi,
          this.provider.getSigner())
      this.tokenB = new ethers.Contract(
          this.$store.contracts.tokenB.address,
          this.$store.contracts.tokenB.abi,
          this.provider.getSigner())
      this.router = new ethers.Contract(
          this.$store.contracts.router.address,
          this.$store.contracts.router.abi,
          this.provider.getSigner())
    },
    async addLiquidity() {
      const balanceTokenA = await this.tokenA.balanceOf(this.currentAccount)
      console.log(balanceTokenA)
      const ret1 = await this.tokenA.approve(this.$store.contracts.router.address, 1000000)
      console.log(ret1)
      const ret2 = await this.tokenB.approve(this.$store.contracts.router.address, 1000000)
      console.log(ret2)
      const ret3 = await this.router.addLiquidity(this.$store.contracts.tokenA.address, this.$store.contracts.tokenB.address, 100000, 100000, 0, 0, 1702480290)
      console.log(ret3)
    }
  },
}
</script>