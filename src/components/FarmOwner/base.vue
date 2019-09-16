<script>
    import {mapGetters, mapActions,mapState} from 'vuex';
    import Loading from 'vue-loading-overlay';

    export default {
        name: "base",
        components : {Loading},
        props : {},
        computed: {
            ...mapGetters({
                error: "admin/error/getError",
                spinnerVisible: "admin/spinner/getVisible",
            }),

            ...mapState({
                showError : state => state.admin.error.showError
            })
        },
        mounted(){
            this.$store.dispatch("admin/error/resetError")
        }
    }
</script>
