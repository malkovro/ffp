<style>
.map-container {
  height: 400px;
  width: 450px;
}
</style>

<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-text-field v-model="searchAddress" label="Location" required v-on="on"></v-text-field>
      </template>
      <v-layout class="p-3">
        <v-flex xs12 md4 sm4>
          <v-list class="py-1 px-3 mb-4">
            <v-text-field
              v-model="searchAddress"
              label="Type in the address"
              required
              v-bind:autofocus="true"
            ></v-text-field>
            <v-list-tile v-for="(result, index) in searchResults" :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{ result.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ result.lattitude + ' - ' + result.longitude }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex class="xs12 sm8 md8" v-if="dialog">
          <ffp-basic-map height="350px"></ffp-basic-map>
        </v-flex>
      </v-layout>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";
import Component from "vue-class-component";
import { MainMap } from "../models/main-map";
import { MapSearchResult } from "../models/map-search-result";
import * as L from "leaflet";

@Component({
  computed: mapState({
    count: "count"
  }),
  props: ["address"]
})
export default class extends Vue {
  valid = false;
  dialog = false;
  mainMap = new MainMap();
  address: string;
  searchResults = [];
  searchAddress?: string;

  constructor() {
    super();
    this.searchAddress = this.address ? this.address : "";
  }

  mounted() {
    console.log("Component mounted.");
    while (this.searchResults.length < 5) {
      this.searchResults.push(MapSearchResult.fakeOne());
    }
  }

  increment() {
    this.$store.commit("increment");
  }
}
</script>
