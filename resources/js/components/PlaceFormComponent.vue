<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-text-field
            v-model="place.name"
            :rules="nameRules"
            :counter="20"
            label="Name of the place"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <v-text-field
            v-model="place.description"
            :rules="descriptionRules"
            :counter="140"
            label="Description"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <ffp-location-input v-bind:address="place.address"></ffp-location-input>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Place } from "../models/place";
import Component from "vue-class-component";

@Component
export default class extends Vue {
  valid = false;
  place: Place;
  nameRules = [
    v => !!v || "Name is required",
    v => (v && v.length <= 20) || "Name must be less than 20 characters"
  ];
  descriptionRules = [
    v => !!v || "A description is required",
    v =>
      (v && v.length <= 140) ||
      "The description must be less than 140 characters"
  ];

  constructor() {
    super();
    this.place = new Place();
  }
}
</script>

