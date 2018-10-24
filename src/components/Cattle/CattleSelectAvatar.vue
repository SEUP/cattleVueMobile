<template>
    <div>
       
        <v-btn class="box-green" round style="width:50%;" @click="captureImage()" depressed :color="buttonColor" block>เลือกภาพ</v-btn>
    </div>
</template>

<script>
   import {
        get
    } from "vuex-pathify"
    export default {
        
        name: "FarmerSelectAvatar",
        props : {
            
          buttonColor : {
              type : [String],
              default : "primary",
             
          }
        },computed: {
            getId: get('manageDef/choose_id'), 
        },
        methods: {
            
                change(){
                    this.$emit('send','sad');
                },
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
                        //alert(this.cattle.id);
                    let params = {
                        id:this.getId, 
                        form: uri
                    } 
                   await this.$store.dispatch("manageDef/uploadAvatar", params); 
                  await this.$store.dispatch("cattle/downloadAvatar")
                        this.$router(-1);
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
