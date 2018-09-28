import Axios from "axios"

const API_URL = process.env.API_URL

const axios = Axios.create({
    baseURL : API_URL,
    timeout : 10000,
})

export default axios
