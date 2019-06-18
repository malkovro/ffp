<template>
  <div style="height: 100%; width: 100%;" v-bind:id="mapId"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";
import * as L from "leaflet";
import { MainMap } from "../models/main-map";
import { MapSearchResult } from "../models/map-search-result";

@Component({
  computed: mapState({
    selectedSuggestion: "selectedSuggestion"
  }),
  props: ["markers"],
  watch: {
    markers: function(newVal, oldVal) {
      // Remove markers that are not referenced anymore
      this.mainMap.renderedMarkers.forEach((value, markerKey) => {
        if (
          newVal.filter(markerDef => markerDef.name === markerKey).length === 0
        ) {
          this.removeMarker(markerKey);
        }
      });
      newVal.forEach(markerDef => {
        if (!this.mainMap.renderedMarkers.has(markerDef.name)) {
          this.addMarker(markerDef);
        }
      });
    },
    selectedSuggestion: function(newVal, oldValue) {
      if (
        oldValue &&
        oldValue.locationId !== newVal.locationId &&
        this.mainMap.renderedMarkers.has(oldValue.locationId)
      ) {
        const marker = this.mainMap.renderedMarkers.get(oldValue.locationId);
        marker.remove();
        this.mainMap.renderedMarkers.delete(oldValue.locationId);
      }
      if (!this.mainMap.renderedMarkers.has(newVal.locationId)) {
        this.addMarker(newVal);
      }
      (this.mainMap.map as L.Map).panTo(
        new L.LatLng(newVal.latitude, newVal.longitude)
      );
    }
  }
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

  addMarker(markerDef: MapSearchResult) {
    const marker = L.marker(
      new L.LatLng(markerDef.latitude, markerDef.longitude)
    );
    marker.addTo(this.mainMap.map);
    this.mainMap.renderedMarkers.set(markerDef.locationId, marker);
  }

  removeMarker(markerKey: any) {
    const marker = this.mainMap.renderedMarkers.get(markerKey);
    this.mainMap.renderedMarkers.delete(markerKey);
    marker.remove();
  }
}
</script>