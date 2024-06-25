import axios from "axios";

const host = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'

export const mainAxios = axios.create(
    {
        baseURL: `${host}/api`
    }
)

export const fromAxios = axios.create(
    {
        baseURL: `${host}/api/auth`
    }
)