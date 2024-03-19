import Axios, { CreateAxiosDefaults } from 'axios'

const config: CreateAxiosDefaults = {
    baseURL: 'http://localhost:3333/'
}

export const api =  Axios.create(config)