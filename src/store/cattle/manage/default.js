import axios from "@/axios"
 
const state = {
  femaleBreeder:{},
  breeder:{},
  vaccine:{},
  worms:{},
  doctor:{},
  test:'helloword',

}

const getters = { 
  
  setBreeder: (state) => (data) => {
    state.breeder = data;
},
setFemaleBreeder: (state) => (data) => {
  state.femaleBreeder = data;
},
setVaccine: (state) => (data) => {
  state.vaccine = data;
},  
setWorms: (state) => (data) => {
  state.worms = data;
},  
setDoctor: (state) => (data) => {
  state.doctor = data;
},  
  
  
  
}

const mutations = {


}

const actions = {
    async getData(context, params) { 
        let apiUrl = params.api;
        let result = await axios.get('/api/v1/'+apiUrl)
          .then(async (response) => {  
            console.log(apiUrl,'loadSuccess');
            return response.data;
          })
          .catch((error) => { 
            console.log(apiUrl, error.response.data);
            return null;
          });
    
        return result
      },
    
      async createData(context, params) {
        let form = params.form
        let apiUrl = params.api;
        let result = await axios.post('/api/v1/'+apiUrl, form)
          .then((response) => {
            alert('บันทึกข้อมูลสำเร็จ');
            console.log(apiUrl,'loadSuccess');
            return response.data
          })
          .catch((error) => {
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            console.log(apiUrl, error.response.data);
            return null
          });
        return result
      },
    
      updateData: async function (context, params) {
        let form = params.form
        let apiUrl = params.api;
        let result = await axios.put('/api/v1/'+apiUrl, form)
          .then((response) => {
            alert('แก้ไขข้อมูลสำเร็จ');
            console.log(apiUrl,'loadSuccess');
            return response.data
          })
          .catch((error) => {
            alert('เกิดข้อผิดพลาดในการแก้ไขข้อมูล');
            console.log(apiUrl, error.response.data);
            return null
          });
        return result
        },
    
        async removeData(context, params) {
            let form = params.form
            let apiUrl = params.api;
            let result = await axios.delete('/api/v1/'+apiUrl)
              .then((response) => {
                alert('ลบข้อมูลสำเร็จ');
                console.log(apiUrl,'loadSuccess');
                return response.data
              })
              .catch((error) => {
                alert('เกิดข้อผิดพลาดในการลบข้อมูล');
                console.log(apiUrl, error.response.data);
                return null
              });
            return result
    
          },

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}