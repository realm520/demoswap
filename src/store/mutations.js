export const updateAccount = (state, payload) => {
  state.accounts = payload
  state.history.push('updateAccount')
}
  
// export const updateTokenBContract = (state, payload) => {
//     state.contracts.tokenB.contract = payload
//     state.history.push('updateTokenAContract')
//   }
  