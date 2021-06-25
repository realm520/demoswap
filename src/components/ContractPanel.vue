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
        this.contractResult = ethers.utils.formatEther(balance).toString();
        console.log(balance.toString());
      } else if (this.currentFunction == "approve") {
        const tx = await contract.approve(
          this.currentParams[0],
          this.currentParams[1]
        );
        this.contractResult = tx.hash;
        console.log(tx.hash.toString());
      } else if (this.currentFunction == "allowance") {
        const allowance = await contract.allowance(
          this.currentParams[0],
          this.currentParams[1]
        );
        this.contractResult = ethers.utils.formatEther(allowance).toString();
        console.log(ethers.utils.formatEther(allowance).toString());
      }
    },
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
