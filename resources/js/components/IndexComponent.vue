<template>
  <v-app dark>
    <div class="container">
      <h1>Hello App!</h1>
      <p>
        <!-- use router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
        <router-link to="/map">See the map</router-link>
        <v-btn color="warning" router-link to="/place-form">Add a place</v-btn>
      </p>
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>

      <p>Index component</p>
      <p>Counter state to remind how Vuex orchestrate all this: {{ count }}</p>
      <v-btn color="success" v-on:click="increment()">Increment the counter</v-btn>

      <!-- <ffp-map></ffp-map> -->
    </div>
  </v-app>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  computed: mapState({
    count: "count"
  })
})
export default class extends Vue {
  count?: number;

  mounted() {
    console.log("Component mounted.");
  }
  increment() {
    this.$store.commit("increment");
  }
}
</script>
