<template>
  <v-tooltip top>
    <v-btn icon class="pa-0 ma-0" @click="exportCattle(cattleId)" slot="activator">
      <v-icon class="effect">mdi-file-pdf</v-icon>
    </v-btn>
    <span>ส่งออก PDF</span>
  </v-tooltip>
</template>

<script>
  export default {
    name: "ExportCattleButton",
    props: {
      cattleId: [String,Number]
    },
    methods : {
      exportCattle: function(id){
        axios({
          url: `/api/v1/admin/summary/${id}/cattle-pdf-exporter`,
          method: 'GET',
          responseType: 'blob', // important
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `export_cattle_${id}.pdf`);
          document.body.appendChild(link);
          link.click();
        });
      },
    }
  }
</script>

<style scoped>

</style>
