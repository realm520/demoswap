<template>
  <div>
    <v-card class="mx-auto my-12" width="70%">
      <v-card-title>Contract Address: </v-card-title>
      <v-combobox
        solo
        v-model="currentContractAddress"
        :items="allContracts"
      ></v-combobox>
      <v-combobox solo v-model="currentFunction" :items="allFunctions"></v-combobox>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-text-field
                outlined
                v-for="(p, i) in currentFunctionInputs"
                :label="p.name"
                :key="i"
                v-model="currentParams[i]"
              >
              </v-text-field>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>{{ contractResult }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn @click="invokeContract()">Execute</v-btn>
    </v-card>
    <!-- <v-card class="mx-auto my-12" width="70%">
    <v-card-title>TokenA ({{contracts.tokenA.address}})</v-card-title>
    <v-form>
    <v-container>
      <v-row>
      <v-col cols="12" md="4"> balanceOf </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="address" v-model="contracts.tokenA.balanceOf.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4"><v-btn @click="invokeTokenalanceOf(contracts.tokenA)">Execute</v-btn></v-col>
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

      <v-row>
      <v-col cols="12" md="4">
        transfer
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="to" v-model="contracts.tokenA.transfer.to" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="value" v-model="contracts.tokenA.transfer.value" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="invokeTokenTransfer(contracts.tokenA)">Execute</v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-chip v-if="contracts.tokenA.transfer.result!=''">{{contracts.tokenA.transfer.result}}</v-chip>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
  </v-card>

  <v-card class="mx-auto my-12" width="70%">
    <v-card-title>TokenB ({{contracts.tokenB.address}})</v-card-title>
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
    <v-card-title>DSPToken ({{contracts.tokenDSP.address}})</v-card-title>
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
    <v-card-title>Router ({{contracts.router.address}})</v-card-title>
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
    <v-card-title>Dao ({{contracts.dao.address}})</v-card-title>
    <v-form>
    <v-container>
      <v-row>
      <v-col cols="12" md="4">
        getReward
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="" v-model="contracts.dao.getReward.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="getReward">Execute</v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-chip v-if="contracts.dao.getReward.result!=''">{{contracts.dao.getReward.result}}</v-chip>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        predReward
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="" v-model="contracts.dao.predReward.address" required></v-text-field>
      </v-col>
      </v-row>
      <v-row>
      <v-col cols="12" md="4">
        <v-btn @click="predReward">Execute</v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-chip v-if="contracts.dao.predReward.result!=''">{{contracts.dao.predReward.result}}</v-chip>
      </v-col>
      </v-row>
    </v-container>
    </v-form>
  </v-card>

  <v-card class="mx-auto my-12" width="70%">
    <v-card-title>PairAB ({{contracts.pairAB.address}})</v-card-title>
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

  <v-card class="mx-auto my-12" width="70%">
    <v-card-title>Invitation ({{contracts.invitation.address}})</v-card-title>
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
  </v-card> -->
  </div>
</template>
<script>
import { ethers } from "ethers";
// import { exception } from 'console';

export default {
  name: "PoolPanel",
  data() {
    return {
      fromAddr: "0x5Da9aF329740c4c155e05932749fCBa44Cf09c79",
      isShowPoolBtn: true,
      provider: null,
      currentContractAddress: "",
      currentFunction: "",
      currentFunctionInputs: [],
      currentFunctions: [],
      currentParams: [],
      contractResult: "",
      contracts: {},
    };
  },
  mounted() {
    this.checkMetaMask();
  },
  computed: {
    allContracts() {
      let contracts = [];
      for (var c in this.$store.state.contracts) {
        if (this.$store.state.contracts[c].abi == undefined) {
          continue;
        }
        contracts.push(this.$store.state.contracts[c].address);
      }
      return contracts;
    },
    allFunctions() {
      let functions = [];
      for (var c in this.currentFunctions) {
        functions.push(this.currentFunctions[c].name);
      }
      return functions;
    },
  },
  watch: {
    currentContractAddress(newAddr) {
      this.currentFunctions = [];
      for (var c in this.$store.state.contracts) {
        if (this.$store.state.contracts[c].address == newAddr) {
          for (var f in this.$store.state.contracts[c].abi) {
            // console.log(this.$store.state.contracts[c].abi[f].type);
            if (this.$store.state.contracts[c].abi[f].type == "function") {
              // console.log(this.$store.state.contracts[c].abi[f].name);
              // console.log(this.$store.state.contracts[c].abi[f].inputs);
              var inputs = [];
              for (var i in this.$store.state.contracts[c].abi[f].inputs) {
                inputs.push({
                  name: this.$store.state.contracts[c].abi[f].inputs[i].name,
                  type: this.$store.state.contracts[c].abi[f].inputs[i].type,
                });
              }
              this.currentFunctions.push({
                name: this.$store.state.contracts[c].abi[f].name,
                params: inputs,
              });
            }
          }
        }
      }
      console.log(this.currentFunctions);
    },
    currentFunction(newFunction) {
      this.currentFunctionInputs = [];
      this.currentParams = [];
      for (var i in this.currentFunctions) {
        if (this.currentFunctions[i].name == newFunction) {
          //console.log(this.currentFunctions[i].params.length);
          this.currentFunctionInputs = this.currentFunctions[i].params;
          this.currentParams.push("");
          break;
        }
      }
    },
  },
  methods: {
    checkMetaMask() {
      if (this.provider) {
        console.log("checkMetaMask1");
        return;
      } else if (this.$store.getters.isMetaMaskConnected) {
        console.log("checkMetaMask2");
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        for (var c in this.$store.state.contracts) {
          this.contracts[this.$store.state.contracts[c].address] = {
            address: this.$store.state.contracts[c].address,
            abi: this.$store.state.contracts[c].abi,
          };
        }
      }
    },
    async invokeContract() {
      this.checkMetaMask();
      console.log(this.fromAddr);
      console.log(this.currentParams);
      console.log(this.currentContractAddress);
      console.log(this.currentFunction);
      console.log(this.contracts[this.currentContractAddress]);
      let contract = new ethers.Contract(
        this.currentContractAddress,
        this.contracts[this.currentContractAddress].abi,
        this.provider.getSigner()
      );
      if (this.currentFunction == "name") {
        let name = await contract.name();
        this.contractResult = name;
        console.log(name);
      } else if (this.currentFunction == "decimals") {
        let decimals = await contract.decimals();
        this.contractResult = decimals;
        console.log(decimals.toString());
      } else if (this.currentFunction == "balanceOf") {
        let balance = await contract.balanceOf(this.currentParams[0]);
        this.contractResult = balance;
        console.log(balance.toString());
      }
    },
    // async invokeTokenalanceOf(token) {
    //   this.checkMetaMask();
    //   const balance = await token.contract.balanceOf(token.balanceOf.address);
    //   //   this.contracts.tokenA.balanceOf.result = balanceTokenA.div(BigNumber.from('100000000000')).toNumber() / 1000000
    //   token.balanceOf.result = balance.div(BigNumber.from("100000000000")).toString();
    // },
    // async invokeTokenAllowance(token) {
    //   this.checkMetaMask();
    //   const allowance = await token.contract.allowance(
    //     token.allowance.approver,
    //     token.allowance.approveTo
    //   );
    //   token.allowance.result = allowance;
    // },
    // async invokeTokenApprove(token) {
    //   this.checkMetaMask();
    //   const tx = await token.contract.approve(
    //     token.approve.approveTo,
    //     token.approve.value
    //   );
    //   token.approve.result = tx.hash;
    // },
    // async invokeTokenTransfer(token) {
    //   this.checkMetaMask();
    //   const tx = await token.contract.transfer(token.transfer.to, token.transfer.value);
    //   token.transfer.result = tx.hash;
    // },
    // async invokeRouterAddLiquidity() {
    //   this.checkMetaMask();
    //   const tx = await this.contracts.tokenA.contract.approve(
    //     this.contracts.router.addLiquidity.tokenA,
    //     this.contracts.router.addLiquidity.tokenB
    //   );
    //   this.contracts.tokenA.approve.result = tx.hash;
    // },
    // async invokePairABToken0() {
    //   this.checkMetaMask();
    //   const token0 = await this.contracts.pairAB.contract.token0();
    //   this.contracts.pairAB.token0.result = token0;
    // },
    // async invokePairABToken1() {
    //   this.checkMetaMask();
    //   const token1 = await this.contracts.pairAB.contract.token1();
    //   this.contracts.pairAB.token1.result = token1;
    // },
    // async addInvitationRelation() {
    //   this.checkMetaMask()
    //   try {
    //     const tx = await this.contracts.invitation.contract.add_invitation_relation(
    //         this.contracts.invitation.addInvitationRelation.inviter
    //     )
    //     this.contracts.invitation.addInvitationRelation.result = tx.hash
    //   } catch (err) {
    //       console.log(err.data.message)
    //   }
    // },
    async getDelegate() {
      this.checkMetaMask();
      if (this.contracts.invitation.getDelegate.address == "") {
        return;
      }
      const delegate = await this.contracts.invitation.contract.getDelegate(
        this.contracts.invitation.getDelegate.address
      );
      this.contracts.invitation.getDelegate.result = delegate;
    },
    async getMembers() {
      this.checkMetaMask();
      if (this.contracts.invitation.getMembers.address == "") {
        return;
      }
      const members = await this.contracts.invitation.contract.getMembers(
        this.contracts.invitation.getMembers.address
      );
      this.contracts.invitation.getMembers.result = members;
    },
    // async getReward() {
    //   this.checkMetaMask()
    //   if (this.contracts.dao.getReward.address == '') {
    //       this.contracts.dao.getReward.result = 'Empty address'
    //       return
    //   }
    //   const tx = await this.contracts.dao.contract.getReward(
    //       this.contracts.dao.getReward.address
    //   )
    //   this.contracts.dao.getReward.result = tx.hash
    // },
    // async predReward() {
    //   this.checkMetaMask()
    //   if (this.contracts.dao.predReward.address == '') {
    //       this.contracts.dao.predReward.result = 'Empty address'
    //       return
    //   }
    //   try {
    //     const value = await this.contracts.dao.contract.predReward(
    //       this.contracts.dao.predReward.address
    //     )
    //     this.contracts.dao.predReward.result = value
    //   } catch (err) {
    //     console.log(err)
    //     this.contracts.dao.predReward.result = 'No Liquidity'
    //   }
    // }
  },
};
</script>
