<template>
  <div>
    <div>
      <span v-html="address.houseNumber"></span>
      <span v-html="address.street"></span>
    </div>
    <div>
      <span v-html="address.postalCode"></span>
      <span v-html="address.city"></span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: ["address"]
})
export default class extends Vue {
  address?: any;
}
</script>