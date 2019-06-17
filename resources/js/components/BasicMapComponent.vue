<template>
  <div v-bind:id="mapId" v-bind:style="{ height: height }"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
import * as L from "leaflet";
import { MainMap } from "../models/main-map";

@Component({
  props: ["height"]
})
export default class extends Vue {
  mainMap = new MainMap();
  randId: number;
  count?: number;
  height: string;

  constructor() {
    super();
    this.randId = Math.floor(Math.random() * 1000000);
  }

  mounted() {
    this.initLayers();
    this.initMap();
  }
  get mapId() {
    return "map_" + this.randId;
  }

  initMap() {
    this.mainMap.tileLayer = new (L as any).StamenTileLayer("watercolor");
    this.mainMap.map = new L.Map(this.mapId, {
      center: new L.LatLng(37.7, -122.4),
      zoom: 12
    });
    this.mainMap.map.addLayer(<L.Layer>this.mainMap.tileLayer);
  }
  initLayers() {}
}
</script>