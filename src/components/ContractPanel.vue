<template>
<div>
  <v-card class="mx-auto my-12" width="70%">
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
        <v-btn @click="invokeTokenalanceOf(contracts.tokenA)">Execute</v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-chip v-if="contracts.tokenA.balanceOf.result!=''">{{contracts.tokenA.balanceOf.result}}</v-chip>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4">
        approve
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="approveTo" v-model="contracts.tokenA.approve.approveTo" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="value" v-model="contracts.tokenA.approve.value" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeTokenApprove(contracts.tokenA)">Execute</v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-chip v-if="contracts.tokenA.approve.result!=''">{{contracts.tokenA.approve.result}}</v-chip>
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
        <v-text-field label="approveTo" v-model="contracts.tokenA.allowance.approveTo" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeTokenAllowance(contracts.tokenA)">Execute</v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-chip v-if="contracts.tokenA.allowance.result!=''">{{contracts.tokenA.allowance.result}}</v-chip>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
  </v-card>

  <v-card class="mx-auto my-12" width="70%">
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
        <v-btn @click="invokeTokenalanceOf(contracts.tokenB)">Execute</v-btn>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4">
        allowance
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="approver" v-model="contracts.tokenB.allowance.approver" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="approveTo" v-model="contracts.tokenB.allowance.approveTo" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeTokenAllowance(contracts.tokenB)">Execute</v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-chip v-if="contracts.tokenB.allowance.result!=''">{{contracts.tokenB.allowance.result}}</v-chip>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
  </v-card>

  <v-card class="mx-auto my-12" width="70%">
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
        <v-btn @click="invokeTokenalanceOf(contracts.tokenDSP)">Execute</v-btn>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
  </v-card>

  <v-card class="mx-auto my-12" width="70%">
    <v-card-title>Router</v-card-title>
    <v-form>
    <v-container>
      <v-row>
      <v-col cols="12" md="4">
        addLiquidity
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="TokenA Amount" v-model="contracts.router.addLiquidity.tokenA" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="TokenB Amount" v-model="contracts.router.addLiquidity.tokenB" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeRouterAddLiquidity">Execute</v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-chip v-if="contracts.router.addLiquidity.result!=''">{{contracts.router.addLiquidity.result}}</v-chip>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
  </v-card>

  <v-card class="mx-auto my-12" width="70%">
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
        <v-btn @click="invokeTokenalanceOf(contracts.pairAB)">Execute</v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-chip v-if="contracts.pairAB.balanceOf.result!=''">{{contracts.pairAB.balanceOf.result}}</v-chip>
      </v-col>
      </v-row>

      <v-row><v-col cols="12" md="4"> token0 </v-col></v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn @click="invokePairABToken0">Execute</v-btn>
        </v-col>
        <v-col cols="12" md="8">
          <v-chip v-if="contracts.pairAB.token0.result!=''">{{contracts.pairAB.token0.result}}</v-chip>
        </v-col></v-row>
      <v-row><v-col cols="12" md="4"> token1 </v-col></v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn @click="invokePairABToken1">Execute</v-btn>
        </v-col>
        <v-col cols="12" md="8">
          <v-chip v-if="contracts.pairAB.token1.result!=''">{{contracts.pairAB.token1.result}}</v-chip>
        </v-col>
      </v-row>

      <!-- <v-row>
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
      </v-row> -->
    </v-container>
    </v-form>
  </v-card>

  <v-card class="mx-auto my-12" width="70%">
    <v-card-title>Invitation</v-card-title>
    <v-form>
    <v-container>
      <v-row>
      <v-col cols="12" md="4">
        add_invitation_relation
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="Inviter Address" v-model="contracts.invitation.addInvitationRelation.inviter" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="addInvitationRelation">Execute</v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-chip v-if="contracts.invitation.addInvitationRelation.result!=''">{{contracts.invitation.addInvitationRelation.result}}</v-chip>
      </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4"> getDelegate </v-col>
        <v-col cols="12" md="8">
        <v-text-field label="Address" v-model="contracts.invitation.getDelegate.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn @click="getDelegate">Execute</v-btn>
        </v-col>
        <v-col cols="12" md="8">
          <v-chip v-if="contracts.invitation.getDelegate.result!=''">{{contracts.invitation.getDelegate.result}}</v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4"> getMembers </v-col>
        <v-col cols="12" md="8">
        <v-text-field label="Address" v-model="contracts.invitation.getMembers.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn @click="getMembers">Execute</v-btn>
        </v-col>
        <v-col cols="12" md="8">
          <v-list flatv-if="contracts.invitation.getMembers.result.length>0">
            <v-list-item v-for="(item, i) in contracts.invitation.getMembers.result" :key="i">
              <v-chip>{{item}}</v-chip>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
    </v-form>
  </v-card>
</div>
</template>
<script>

import { BigNumber, ethers } from "ethers";

export default {
  name: 'PoolPanel',
  data() {
      return {
        isShowPoolBtn: true,
        provider: null,
        contracts: {
            tokenA: {
                contract: null,
                balanceOf: {
                    address: '',
                    result: ''
                },
                approve: {
                    approveTo: '',
                    value: '',
                    result: ''
                },
                allowance: {
                    approver: '',
                    approveTo: '',
                    result: ''
                }
            },
            tokenB: {
                contract: null,
                balanceOf: {
                    address: '',
                    result: ''
                },
                approve: {
                    approveTo: '',
                    value: '',
                    result: ''
                },
                allowance: {
                    approver: '',
                    approveTo: '',
                    result: ''
                }
            },
            tokenDSP: {
                contract: null,
                balanceOf: {
                    address: '',
                    result: ''
                }
            },
            router: {
                contract: null,
                addLiquidity: {
                    tokenA: '',
                    tokenB: '',
                    result: ''
                }
            },
            invitation: {
                contract: null,
                addInvitationRelation: {
                    inviter: '',
                    result: ''
                },
                getDelegate: {
                    address: '',
                    result: ''
                },
                getMembers: {
                    address: '',
                    result: []
                }
            },
            pairAB: {
                contract: null,
                balanceOf: {
                    address: '',
                    result: ''
                },
                token0: {
                    result: ''
                },
                token1: {
                    result: ''
                }
            },
        }
      }
  },
  mounted() {
      this.checkMetaMask()
    },
    methods: {
    checkMetaMask() {
      if (this.provider) {
          return
      } else if (this.$store.getters.isMetaMaskConnected) {
        this.provider = new ethers.providers.Web3Provider(window.ethereum)
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
        this.contracts.invitation.contract = new ethers.Contract(
            this.$store.state.contracts.invitation.address,
            this.$store.state.contracts.invitation.abi,
            this.provider.getSigner())
      }
    },
    async invokeTokenalanceOf(token) {
      this.checkMetaMask()
      const balance = await token.contract.balanceOf(token.balanceOf.address)
    //   this.contracts.tokenA.balanceOf.result = balanceTokenA.div(BigNumber.from('100000000000')).toNumber() / 1000000
      token.balanceOf.result = balance.div(BigNumber.from('100000000000')).toString()
    },
    async invokeTokenAllowance(token) {
      this.checkMetaMask()
      const allowance = await token.contract.allowance(
        token.allowance.approver, 
        token.allowance.approveTo)
      token.allowance.result = allowance
    },
    async invokeTokenApprove(token) {
      this.checkMetaMask()
      const tx = await token.contract.approve(
        token.approve.approveTo, 
        token.approve.value)
      token.approve.result = tx.hash
    },
    async invokeRouterAddLiquidity() {
      this.checkMetaMask()
      const tx = await this.contracts.tokenA.contract.approve(
        this.contracts.router.addLiquidity.tokenA, 
        this.contracts.router.addLiquidity.tokenB)
      this.contracts.tokenA.approve.result = tx.hash
    },
    async invokePairABToken0() {
      this.checkMetaMask()
      const token0 = await this.contracts.pairAB.contract.token0()
      this.contracts.pairAB.token0.result = token0
    },
    async invokePairABToken1() {
      this.checkMetaMask()
      const token1 = await this.contracts.pairAB.contract.token1()
      this.contracts.pairAB.token1.result = token1
    },
    async addInvitationRelation() {
      this.checkMetaMask()
      try {
        const tx = await this.contracts.invitation.contract.add_invitation_relation(
            this.contracts.invitation.addInvitationRelation.inviter
        )
        this.contracts.invitation.addInvitationRelation.result = tx.hash
      } catch (err) {
          console.log(err.data.message)
      }
    },
    async getDelegate() {
      this.checkMetaMask()
      if (this.contracts.invitation.getDelegate.address == '') {
          return
      }
      const delegate = await this.contracts.invitation.contract.getDelegate(
          this.contracts.invitation.getDelegate.address
      )
      this.contracts.invitation.getDelegate.result = delegate
    },
    async getMembers() {
      this.checkMetaMask()
      if (this.contracts.invitation.getMembers.address == '') {
          return
      }
      const members = await this.contracts.invitation.contract.getMembers(
          this.contracts.invitation.getMembers.address
      )
      this.contracts.invitation.getMembers.result = members
    }
  },
}
</script>