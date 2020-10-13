<template>
<div>
  <v-card class="mx-auto my-12" width="500">
    <v-card-title>TokenA</v-card-title>
    <v-form>
    <v-container>
      <v-row>
      <v-col cols="12" md="4">
        balanceOf
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="address" v-model="contracts.tokenA.balanceOf.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeTokenABalanceOf()">Execute</v-btn>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4">
        allowance
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="approver" v-model="contracts.tokenA.allowance.approver" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="address" v-model="contracts.tokenA.allowance.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeTokenAAllowance">Execute</v-btn>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
    <!-- <v-card-actions>
      <v-btn @click="isShowPoolBtn=false;" v-if="isShowPoolBtn">Add Liquidity</v-btn>
    </v-card-actions> -->
  </v-card>

  <v-card class="mx-auto my-12" width="500">
    <v-card-title>TokenB</v-card-title>
    <v-form>
    <v-container>
      <v-row>
      <v-col cols="12" md="4">
        balanceOf
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="address" v-model="contracts.tokenB.balanceOf.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeTokenBBalanceOf">Execute</v-btn>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4">
        allowance
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="approver" v-model="contracts.tokenA.allowance.approver" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="address" v-model="contracts.tokenA.allowance.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeTokenBAllowance">Execute</v-btn>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
    <!-- <v-card-actions>
      <v-btn @click="isShowPoolBtn=false;" v-if="isShowPoolBtn">Add Liquidity</v-btn>
    </v-card-actions> -->
  </v-card>

  <v-card class="mx-auto my-12" width="500">
    <v-card-title>DSPToken</v-card-title>
    <v-form>
    <v-container>
      <v-row>
      <v-col cols="12" md="4">
        balanceOf
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="address" v-model="contracts.tokenDSP.balanceOf.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeContract">Execute</v-btn>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4"> allowance </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="approver" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4"> </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeContract">Execute</v-btn>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
  </v-card>

  <v-card class="mx-auto my-12" width="500">
    <v-card-title>Router</v-card-title>
    <v-form>
    <v-container>
      <v-row>
      <v-col cols="12" md="4">
        addLiquidity
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field :counter="10" label="0.0" required></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn @click="invokeContract">Execute</v-btn>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4">
        allowance
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field :counter="10" label="0.0" required></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn @click="invokeContract">Execute</v-btn>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
  </v-card>

  <v-card class="mx-auto my-12" width="500">
    <v-card-title>PairAB</v-card-title>
    <v-form>
    <v-container>
      <v-row>
      <v-col cols="12" md="4"> balanceOf </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="address" v-model="contracts.pairAB.balanceOf.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeContract">Execute</v-btn>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4"> allowance </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="approver" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4"> </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeContract">Execute</v-btn>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
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
        contracts: {
            tokenA: {
                contract: null,
                balanceOf: {
                    address: ''
                },
                allowance: {
                    approver: '',
                    address: ''
                }
            },
            tokenB: {
                contract: null,
                balanceOf: {
                    address: ''
                }
            },
            tokenDSP: {
                contract: null,
                balanceOf: {
                    address: ''
                }
            },
            router: {
                contract: null
            },
            pairAB: {
                contract: null,
                balanceOf: {
                    address: ''
                }
            },
        }
      }
  },
  mounted() {
      console.log(this.$store.state.contracts)
      this.contracts.tokenA.contract = new ethers.Contract(
          this.$store.state.contracts.tokenA.address,
          this.$store.state.contracts.tokenA.abi,
          this.provider.getSigner())
      this.contracts.tokenB.contract = new ethers.Contract(
          this.$store.state.contracts.tokenB.address,
          this.$store.state.contracts.tokenB.abi,
          this.provider.getSigner())
      this.contracts.router.contract = new ethers.Contract(
          this.$store.state.contracts.router.address,
          this.$store.state.contracts.router.abi,
          this.provider.getSigner())
      this.contracts.tokenDSP.contract = new ethers.Contract(
          this.$store.state.contracts.tokenDsp.address,
          this.$store.state.contracts.tokenDsp.abi,
          this.provider.getSigner())
      this.contracts.pairAB.contract = new ethers.Contract(
          this.$store.state.contracts.pairAB.address,
          this.$store.state.contracts.pairAB.abi,
          this.provider.getSigner())
    },
    methods: {
    async invokeTokenABalanceOf() {
      const balanceTokenA = await this.contracts.tokenA.contract.balanceOf(this.contracts.tokenA.balanceOf.address)
      console.log(balanceTokenA)
    },
    async invokeTokenAAllowance() {
      const allowanceTokenA = await this.contracts.tokenA.contract.allowance(
        this.contracts.tokenA.allowance.approver, 
        this.contracts.tokenA.allowance.address)
      console.log(allowanceTokenA)
    },
    async invokeTokenBBalanceOf() {
      const balanceTokenB = await this.contracts.tokenB.contract.balanceOf(this.contracts.tokenB.balanceOf.address)
      console.log(balanceTokenB)
    },
    async invokeTokenBAllowance() {
      const allowanceTokenB = await this.contracts.tokenB.contract.allowance(
        this.contracts.tokenB.allowance.approver, 
        this.contracts.tokenB.allowance.address)
      console.log(allowanceTokenB)
    },
    async invokeContract() {

    }
  },
}
</script>