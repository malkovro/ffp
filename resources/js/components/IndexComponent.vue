<template>
    <div class="container">
        <p>Index component</p>
        <p> Counter state to remind how Vuex orchestrate all this: {{ count }}</p>
        <button v-on:click="increment()">Increment the counter</button>

        <ffp-map></ffp-map>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        computed: mapState({
            count: 'count'
        }),
        methods: {
            increment: function() {
                this.$store.commit('increment');
            }
        }
    }
</script>
