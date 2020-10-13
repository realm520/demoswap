export const isMetaMaskConnected = state => state.accounts && state.accounts.length > 0

export const recentHistory = state => {
  return state.history
    .slice(-5)
    .join(', ')
}
