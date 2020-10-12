<template>
  <div>
  <v-tabs centered v-model="tab">
    <v-tab>Swap</v-tab>
    <v-tab>Pool</v-tab>
  </v-tabs>

  <v-tabs-items v-model="tab">
      <v-tab-item>
          <SwapPanel></SwapPanel>
      </v-tab-item>
      <v-tab-item>
          <PoolPanel></PoolPanel>
      </v-tab-item>
  </v-tabs-items>
  </div>
</template>
<script>
import SwapPanel from '@/components/SwapPanel.vue'
import PoolPanel from '@/components/PoolPanel.vue'

export default {
  name: 'SwapPool',
  components: {SwapPanel, PoolPanel},
  data() {
      return {
          tab: null
      }
  }
}
</script>