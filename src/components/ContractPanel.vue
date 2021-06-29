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
import { signERC2612Permit } from "eth-permit";
// import { exception } from 'console';

export default {
  name: "PoolPanel",
  data() {
    return {
      fromAddr: "",
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
        this.fromAddr = this.$store.state.accounts[0];
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
        const tx = await contract.approve(this.currentParams[0], this.currentParams[1]);
        this.contractResult = tx.hash;
        console.log(tx.hash.toString());
      } else if (this.currentFunction == "allowance") {
        const allowance = await contract.allowance(
          this.currentParams[0],
          this.currentParams[1]
        );
        this.contractResult = ethers.utils.formatEther(allowance).toString();
        console.log(ethers.utils.formatEther(allowance).toString());
      } else if (this.currentFunction == "permit") {
        // const chainId = 123;
        // const msgParams = {
        //   domain: {
        //     chainId: chainId.toString(),
        //     name: "Ether Mail",
        //     verifyingContract: this.currentContractAddress,
        //     version: "1",
        //   },
        //   message: {
        //     contents: "Hello, Bob!",
        //     from: {
        //       name: "Cow",
        //       wallets: [
        //         "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        //         "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
        //       ],
        //     },
        //     to: [
        //       {
        //         name: "Bob",
        //         wallets: [
        //           "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        //           "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
        //           "0xB0B0b0b0b0b0B000000000000000000000000000",
        //         ],
        //       },
        //     ],
        //   },
        //   primaryType: "Mail",
        //   types: {
        //     EIP712Domain: [
        //       { name: "name", type: "string" },
        //       { name: "version", type: "string" },
        //       { name: "chainId", type: "uint256" },
        //       { name: "verifyingContract", type: "address" },
        //     ],
        //     Group: [
        //       { name: "name", type: "string" },
        //       { name: "members", type: "Person[]" },
        //     ],
        //     Mail: [
        //       { name: "from", type: "Person" },
        //       { name: "to", type: "Person[]" },
        //       { name: "contents", type: "string" },
        //     ],
        //     Person: [
        //       { name: "name", type: "string" },
        //       { name: "wallets", type: "address[]" },
        //     ],
        //   },
        // };
        // try {
        //   const from = accounts[0];
        //   const sign = await ethereum.request({
        //     method: "eth_signTypedData_v4",
        //     params: [from, JSON.stringify(msgParams)],
        //   });
        //   signTypedDataV4Result.innerHTML = sign;
        //   signTypedDataV4Verify.disabled = false;
        //   console.log("r: " + sign.slice(0, 66));
        //   console.log("s: 0x" + sign.slice(66, 130));
        //   console.log("v: " + parseInt(sign.slice(130, 132), 16));
        // } catch (err) {
        //   console.error(err);
        //   signTypedDataV4Result.innerHTML = `Error: ${err.message}`;
        // }
        console.log(this.fromAddr);
        const result = await signERC2612Permit(
          window.ethereum,
          this.currentContractAddress,
          this.fromAddr,
          this.currentParams[1],
          this.currentParams[2]
        );
        console.log(result);
        await contract
          .permit(
            this.fromAddr,
            this.currentParams[1],
            this.currentParams[2],
            result.deadline,
            result.v,
            result.r,
            result.s
          );
        const allowance = await contract.allowance(
          this.currentParams[0],
          this.currentParams[1]
        );
        this.contractResult = ethers.utils.formatEther(allowance).toString();
        console.log(ethers.utils.formatEther(allowance).toString());
      }
    },
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
