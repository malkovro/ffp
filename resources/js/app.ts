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

import axios from 'axios';

import ExampleComponent from './components/ExampleComponent.vue';
import IndexComponent from './components/IndexComponent.vue';
import MapComponent from './components/MapComponent.vue';
import BasicMapComponent from './components/BasicMapComponent.vue';
import PlaceFormComponent from './components/PlaceFormComponent.vue';
import LocationInputComponent from './components/LocationInputComponent.vue';
import AddressLineComponent from './components/AddressLineComponent.vue';

import { GeocoderService } from './services/geocoder-service';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);

const store = new Vuex.Store({
    state: {
        count: 0,
        autocompleteSuggestions: [],
        selectedSuggestion: null
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        setAutocompleteSuggestions(state, suggestions) {
            state.autocompleteSuggestions = suggestions;
        },
        setSelectedSuggestion(state, suggestion) {
            state.selectedSuggestion = suggestion;
        }
    },
    actions: {
        fetchAutocompleteSuggestion(context, query) {
            if (false) {
                context.commit('setAutocompleteSuggestions', FAKE_STATIC_SUGGESTIONS.suggestions);
            } else {
                GeocoderService.getSuggestions(query)
                    .then(res => res.data)
                    .then(data => {
                        context.commit('setAutocompleteSuggestions', data.suggestions);
                    });
            }
        },
        suggestionSelected(context, suggestion) {
            if (false) {
                // context.commit('setSelectedSuggestion', FAKE_STATIC_SUGGESTION);
            } else {
                GeocoderService.getLocation(suggestion.locationId)
                    .then(res => res.data)
                    .then(data => {
                        const suggestionExtended = Object.assign({}, suggestion);
                        const detailedLocation =
                            data.response.view.length > 0 ? data.response.view[0].result[0].location.displayPosition : null;

                        if (detailedLocation) {
                            suggestionExtended.latitude = detailedLocation.latitude;
                            suggestionExtended.longitude = detailedLocation.longitude;
                            context.commit('setSelectedSuggestion', suggestionExtended);
                        }
                    });
            }
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
Vue.component('ffp-address-line', AddressLineComponent);

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

const FAKE_STATIC_SUGGESTIONS = {
    suggestions: [
        {
            label: "France, <b>Saint</b>-Rémy-l'<b>Honoré</b>, <b>20</b> <b>Rue</b> de la Lombarderie",
            language: 'fr',
            countryCode: 'FRA',
            locationId: 'NT_oG43I5r6CcewMG6RC63fQA_yAD',
            address: {
                country: 'France',
                state: 'Île-de-France',
                county: 'Yvelines',
                city: "<b>Saint</b>-Rémy-l'<b>Honoré</b>",
                street: '<b>Rue</b> de la Lombarderie',
                houseNumber: '<b>20</b>',
                postalCode: '78690'
            },
            matchLevel: 'houseNumber'
        },
        {
            label: 'France, Paris, <b>20</b> <b>Rue</b> du Faubourg <b>Saint</b>-<b>Honoré</b>',
            language: 'fr',
            countryCode: 'FRA',
            locationId: 'NT_PD9d0LVuiEu4BvIPBZeT7A_yAD',
            address: {
                country: 'France',
                state: 'Île-de-France',
                county: 'Paris',
                city: 'Paris',
                district: '8e Arrondissement',
                street: '<b>Rue</b> du Faubourg <b>Saint</b>-<b>Honoré</b>',
                houseNumber: '<b>20</b>',
                postalCode: '75008'
            },
            matchLevel: 'houseNumber'
        },
        {
            label: "France, <b>Saint</b>-Rémy-l'<b>Honoré</b>, <b>20</b> <b>Rue</b> du Professeur Mariller",
            language: 'fr',
            countryCode: 'FRA',
            locationId: 'NT_2DpS-iCq2q0oa9LYO8SbgD_yAD',
            address: {
                country: 'France',
                state: 'Île-de-France',
                county: 'Yvelines',
                city: "<b>Saint</b>-Rémy-l'<b>Honoré</b>",
                street: '<b>Rue</b> du Professeur Mariller',
                houseNumber: '<b>20</b>',
                postalCode: '78690'
            },
            matchLevel: 'houseNumber'
        },
        {
            label: 'France, Versailles, <b>20</b> <b>Rue Saint</b>-<b>Honoré</b>',
            language: 'fr',
            countryCode: 'FRA',
            locationId: 'NT_AooqcXqsMK43QEATVohIUC_yAD',
            address: {
                country: 'France',
                state: 'Île-de-France',
                county: 'Yvelines',
                city: 'Versailles',
                district: 'Saint-Louis',
                street: '<b>Rue Saint</b>-<b>Honoré</b>',
                houseNumber: '<b>20</b>',
                postalCode: '78000'
            },
            matchLevel: 'houseNumber'
        },
        {
            label: 'France, <b>Saint</b>-Laurent-du-Var, <b>20</b> <b>Rue Honoré</b> Geoffroy',
            language: 'fr',
            countryCode: 'FRA',
            locationId: 'NT_QkqpBMeFc9wn4Gj-IkUcED_yAD',
            address: {
                country: 'France',
                state: "Provence-Alpes-Côte d'Azur",
                county: 'Alpes-Maritimes',
                city: '<b>Saint</b>-Laurent-du-Var',
                street: '<b>Rue Honoré</b> Geoffroy',
                houseNumber: '<b>20</b>',
                postalCode: '06700'
            },
            matchLevel: 'houseNumber'
        }
    ]
};
