import axios from "axios"
const login = async (body: { username: string, password: string }) => {
    const result = await axios.post(process.env.server_url + "login", body)
    return result.data
}

export const NoUserAuthen = {
    login
}