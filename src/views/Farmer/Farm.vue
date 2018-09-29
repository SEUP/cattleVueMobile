<template>
    <div>

    </div>
</template>

<script>

    import {get,sync} from 'vuex-pathify'

    export default {
        name: 'App',
        components: {

        },
        async beforeRouteEnter(to, from, next) {
            //fetch neccessery data
            next()
        },
        computed: {

        },
        async mounted() {
            await this.initial();
        },
        methods: {
            initial: async function () {
                await this.$store.dispatch("farmer/getFarmer")
                await this.$store.dispatch("farmer/downloadAvatar")
            }
        }


    }
</script>
