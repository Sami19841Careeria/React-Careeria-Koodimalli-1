import axios from 'axios'

//const baseUrl = "https://localhost:7083/api/authentication"
const baseUrl = "https://northwindbackend2022.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }
