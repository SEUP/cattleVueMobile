<template>
    <div></div>
</template>

<script>
    import {get} from "vuex-pathify"

    export default {
        name: "Base",
       
        computed: {
            error: get("error/error")
        }
    }
</script>

<style scoped>

</style>
