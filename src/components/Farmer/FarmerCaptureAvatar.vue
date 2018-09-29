<template>
    <div>
        <v-btn @click="captureImage()" depressed color="success" block>ถ่ายภาพ</v-btn>
    </div>
</template>

<script>
    export default {
        name: "FarmerCaptureAvatar",
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
                        await this.$store.dispatch("farmer/uploadAvatar",uri)
                    },
                    async (error) => {
                        console.log(error)
                    },
                    options
                )
            }
        }
    }
</script>

<style scoped>

</style>
