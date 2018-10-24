<template>
    <div>
        <v-btn class="box-red" round style="width:50%;" @click="captureImage()" depressed :color="buttonColor" block>ถ่ายภาพ</v-btn>
    </div>
</template>

<script>
 import {
        get
    } from "vuex-pathify"
    export default {
        name: "FarmerCaptureAvatar",
        props : {
             cattle:{},
            buttonColor : {
                type : [String],
                default : "primary",

            }
        },computed: {
            getId: get('manageDef/choose_id'),
        },
        methods: {
            captureImage: async function () {
                let options = {
                    destinationType : navigator.camera.DestinationType.DATA_URL,
                    allowEdit : true,
                    targetWidth : 400,
                    targetHeight : 400,
                    encodingType : navigator.camera.EncodingType.PNG,
                }

                navigator.camera.getPicture(
                    async (imageUri) =>{
                        let uri = `data:image/png;base64,${imageUri}` 
                    let params = {
                        id:this.getId, 
                        form: uri
                    } 
                   await this.$store.dispatch("manageDef/uploadAvatar", params); 
                    await this.$store.dispatch("cattle/downloadAvatar")
                    },
                    async (error) => {
                        window.console.log(error)
                    },
                    options
                )
            }
        }
    }
</script>

<style scoped>

</style>
