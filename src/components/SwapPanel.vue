<template>
<div>
  <v-form>
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
        <v-text-field
          :counter="10"
          label="0.0"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select label="BTC"></v-select>
      </v-col>
      </v-row>
    </v-container>
  </v-form>
</div>
</template>
<script>

export default {
  name: 'SwapPanel',
  data() {
      return {}
  }
}
</script>