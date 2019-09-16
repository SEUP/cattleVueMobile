<template>
  <div>
    <div class="height_100 no_margin" @click="showDialog">
      <slot>
        <v-btn
          class="height_100 no_margin"
          block color="secondary" dark depressed>
          <v-icon style="width:3rem;">mdi-camera</v-icon>
          <span>Upload Image</span>
        </v-btn>
      </slot>
    </div>

    <v-dialog v-model="avatarConfirmDialog" scrollable  transition="dialog-bottom-transition" persistent max-width="500px">
      <v-card>
        <v-toolbar card  dense class="grey lighten-4">
          <v-toolbar-title class="body-2 font-weight-bold">รูปโปรไฟล์</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-layout wrap>
              <v-flex xs12 text-xs-center>
                <croppa
                  :width="400"
                  :height="400"
                  :quality="1"
                  v-model="croppa"
                  :show-remove-button="false"
                  :initial-image="url"
                ></croppa>
              </v-flex>
              <v-flex xs12>
              </v-flex>
            </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-toolbar card dense class="grey lighten-4 ">
          <v-spacer></v-spacer>
          <v-btn flat icon color="indigo" @click="rotate(-1)">
            <v-icon>mdi-rotate-left</v-icon>
          </v-btn>
          <v-btn flat icon  color="indigo" @click="rotate(1)">
            <v-icon>mdi-rotate-right</v-icon>
          </v-btn>
          <v-divider vertical />
          <v-btn color="success"  @click.native="save">บันทึก</v-btn>
          <v-btn color="error"  @click.native="avatarConfirmDialog = false">ยกเลิก</v-btn>
        </v-toolbar>
      </v-card>

    </v-dialog>
    <input type="file" ref="fileInput" v-show="false" :accept="accept" @change="onFilePicked"/>
  </div>
</template>

<script>
  const fr = new FileReader();
  import uploadFile from "@/components/share/UploadFile"
  import Vue from 'vue'
  import Croppa from 'vue-croppa'

  Vue.use(Croppa)

  export default {
    name: "upload-cattle-avatar",
    props: {
      accept: ""
    },
    data: () => ({
      files: null,
      filename: null,
      file: null,
      url: null,
      img: null,
      avatarConfirmDialog: false,
      croppa: null,
    }),
    mounted() {
      fr.addEventListener('load', (e) => {
        this.url = fr.result
        this.file = e // this is an image file that can be sent to server...
        this.avatarConfirmDialog = true;
        let img = this.img = new Image()
        img.src = this.url
        this.croppa.refresh();
      })
    },
    methods: {
      rotate: function (angle) {
        this.croppa.rotate(angle);
      },

      save: async function () {

        console.log("URL LENGTH : ",this.url.length);

        let result = await this.$store.dispatch("cattle/uploadAvatar", this.croppa.generateDataUrl('png',1));
        if (result) {
          this.avatarConfirmDialog = false
          this.$emit('change', result)
        }
      },
      showDialog: function () {
        this.$refs.fileInput.click()
      },

      onFilePicked: function (e) {
        this.files = e.target.files
        if (this.files[0] !== undefined) {
          this.filename = this.files[0].name
          if (this.filename.lastIndexOf('.') <= 0) {
            return
          }

          fr.readAsDataURL(this.files[0])

        }
      }
    }
  }
</script>

<style lang="scss" scoped>


  @import "../../../node_modules/vue-croppa/dist/vue-croppa.min.css";

  .height_100 {
    height: 100%;
  }

  .no_margin {
    margin: 0px;
  }

</style>
