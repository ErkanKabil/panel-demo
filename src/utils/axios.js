import axios from 'axios'
import Vue from 'vue'

const axiosInstance = axios.create({
  baseURL: 'https://krmz.org/api/',
  timeout: 1000 * 30,
  headers: {
    common: {
      Accept: 'text/plain, */*',
    },
  },
})

Vue.prototype.$axios = axiosInstance
