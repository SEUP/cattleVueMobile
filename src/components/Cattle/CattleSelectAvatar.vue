<template>
    <div>
        <v-btn @click="captureImage()" depressed :color="buttonColor" block>เลือกภาพ</v-btn>
    </div>
</template>

<script>
    export default {
        name: "FarmerSelectAvatar",
        props : {
          buttonColor : {
              type : [String],
              default : "primary",
              cattle:{},
          }
        },
        methods: {
            captureImage: async function () {
                let options = {
                    destinationType : navigator.camera.DestinationType.DATA_URL,
                    allowEdit : true,
                    targetWidth : 400,
                    targetHeight : 400,
                    encodingType : navigator.camera.EncodingType.PNG,
                    sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
                }

                navigator.camera.getPicture(
                    async (imageUri) =>{
                        let uri = `data:image/png;base64,${imageUri}` 
                        alert(this.cattle.id);
                    let params = {
                        api: 'farmer/cattles/' + this.cattle.id + '/avatar',
                        form: uri
                    }
                   await this.$store.store.dispatch("manageDef/createData", params); 
                    
                    },
                    async (error) => {
                        window.console.log(error)
                        alert(error)
                    },
                    options
                )
            }
        }
    }
</script>

<style scoped>

</style>
