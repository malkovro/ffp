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
          <v-list style="max-height: 350px" class="scroll-y py-1 px-3 mb-4">
            <v-text-field
              v-model="searchAddress"
              @input="debounceInput"
              label="Type in the address"
              required
              v-bind:autofocus="true"
            ></v-text-field>
            <v-list-tile
              v-for="(result, index) in suggestions"
              :key="index"
              v-ripple
              v-on:click="onAddressClicked(result)"
            >
              <v-list-tile-content>
                <ffp-address-line v-bind:address="result.address"></ffp-address-line>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex class="xs12 sm8 md8" v-if="dialog">
          <ffp-basic-map style="height: 350px;" v-bind:markers="markers"></ffp-basic-map>
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
import * as _ from "lodash";
import axios from "axios";

@Component({
  computed: mapState({
    count: "count",
    suggestions: "autocompleteSuggestions"
  }),
  props: ["address"]
})
export default class extends Vue {
  valid = false;
  dialog = false;
  mainMap = new MainMap();
  address: string;
  searchAddress?: string;
  suggestions?: any[];

  constructor() {
    super();
    this.searchAddress = this.address ? this.address : "";
  }

  mounted() {
    console.log("Component mounted.");
  }

  get markers(): any[] {
    return [];
  }

  increment() {
    this.$store.commit("increment");
  }

  debounceInput = _.debounce(e => {
    this.$store.dispatch("fetchAutocompleteSuggestion", e);
  }, 500);

  onAddressClicked(result) {
    this.$store.dispatch("suggestionSelected", result);
  }
}
</script>
