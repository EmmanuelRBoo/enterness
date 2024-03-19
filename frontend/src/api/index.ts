import Axios, { CreateAxiosDefaults } from 'axios'

const config: CreateAxiosDefaults = {
    baseURL: 'http://localhost:5000/'
}

export const api =  Axios.create(config)