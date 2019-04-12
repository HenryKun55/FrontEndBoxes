import axios from 'axios'

const api = axios.create({
    baseURL: 'https://backend-boxes.herokuapp.com'
})

export default api;