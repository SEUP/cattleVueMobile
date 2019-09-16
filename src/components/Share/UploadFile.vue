<template>
  <div>
    <div class="height_100 no_margin" @click="showDialog">
      <slot>
        <v-btn
          class="height_100 no_margin"
          block color="secondary" dark depressed>
          <v-icon style="width:3rem;">mdi-camera</v-icon>
          <span>Upload File</span>
        </v-btn>
      </slot>
    </div>

    <input type="file" ref="fileInput" v-show="false" :accept="accept" @change="onFilePicked"/>
  </div>
</template>

<script>
  const fr = new FileReader();
  export default {
    name: "upload-file",
    props: {
      accept: ""
    },
    data: () => ({
      files: null,
      filename: null,
      file: null,
      url: null
    }),
    mounted() {
      fr.addEventListener('load', (e) => {
        console.log(e)
        this.url = fr.result
        this.file = this.files[0] // this is an image file that can be sent to server...
        this.$emit('change', {
          filename: this.filename,
          file: this.file,
          url: this.url,
        })
      })
    },
    methods: {
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

<style scoped>

  .height_100 {
    height:100%;
  }
  .no_margin {
    margin : 0px;
  }

</style>
