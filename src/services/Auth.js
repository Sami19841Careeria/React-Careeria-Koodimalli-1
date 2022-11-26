import axios from 'axios'

//const baseUrl = "https://localhost:44327/api/authentication"
const baseUrl = "https://northwindbackend.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }
