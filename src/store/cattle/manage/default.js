import axios from "@/axios"
 
const state = {
  femaleBreeder:{},
  breeder:{},
  vaccine:{},
  worms:{},
  doctor:{},
  test:'helloword',
  
  sell:{},
milk:{},
khun:{},
noti:{},
sale:{},

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
 
setSell: (state) => (data) => {
  state.sell = data;
},  
  
setKhun: (state) => (data) => {
  state.khun = data;
},  
  
setMilk: (state) => (data) => {
  state.milk = data;
},  

  
setNoti: (state) => (data) => {
  state.noti = data;
},  
  

  
setSale: (state) => (data) => {
  state.sale = data;
},  
  
  
  
}

const mutations = {


}

const actions = {
  async getForm(context, params) { 
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

          backSell: async function(context,form){ 
            let cattles = null;
            console.log('/api/v1/farmer/farmer/'+form.farmer_id+'/cattles/'+form.id);
            let resultv = await axios.get('/api/v1/farmer/farmer/'+form.farmer_id+'/cattles/'+form.id)
            .then((response) => {
              console.log('Load Ok'); 
              cattles = response.data  
            })
            .catch((error) => {
              console.log(error.stack);
            })
        
            cattles.cattle_status = "010100"
            let result = await axios.put('/api/v1/farmer/farmer/'+form.farmer_id+'/cattles/'+form.id,cattles)
              .then((response) => {
                alert('ยกเลิกการจำหน่ายสำเร็จ');
                
              })
              .catch((error) => {
                console.log(error.stack); 
                alert('เกิดข้อผิดพลาดยกเลิกการจำหน่าย');
              });
            
          }

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}