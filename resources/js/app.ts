/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import 'bootstrap';

require('./stamen');

import Vue from 'vue';

import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

import ExampleComponent from './components/ExampleComponent.vue';
import IndexComponent from './components/IndexComponent.vue';
import MapComponent from './components/MapComponent.vue';
import BasicMapComponent from './components/BasicMapComponent.vue';
import PlaceFormComponent from './components/PlaceFormComponent.vue';
import LocationInputComponent from './components/LocationInputComponent.vue';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++;
        }
    }
});

const routes = [{ path: '/map', component: MapComponent }, { path: '/place-form', component: PlaceFormComponent }];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('ffp-index', ExampleComponent);

Vue.component('ffp-index', IndexComponent);
Vue.component('ffp-map', MapComponent);
Vue.component('ffp-location-input', LocationInputComponent);
Vue.component('ffp-basic-map', BasicMapComponent);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    store,
    router
});
