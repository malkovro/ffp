<style>
    .ffp-map { height: 600px; }
</style>

<template>
    <div id="map" class="ffp-map"></div>
</template>

<script>
    import { mapState } from 'vuex';
    
    export default {
        data: function() {
            return {
                map: null,
                tileLayer: null,
                layers: [],
            }
        },
        mounted() {
            this.initMap();
            this.initLayers();
        },
        computed: mapState({
            count: 'count'
        }),
        methods: {
            initMap() {
                this.tileLayer = new L.StamenTileLayer("watercolor");
                this.map = new L.Map("map", {
                    center: new L.LatLng(37.7, -122.4),
                    zoom: 12
                });
                this.map.addLayer(this.tileLayer);
            },
            initLayers() {},
        }
    }
</script>