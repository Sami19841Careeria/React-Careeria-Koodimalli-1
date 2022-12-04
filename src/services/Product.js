import axios from "axios"

//const baseUrl = "https://localhost:44327/api/customers"
const baseUrl = "https://northwindbackend.azurewebsites.net/api/products"

let token = null

// Tämä on metodi jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}


const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}


const create = newProduct => {
    return axios.post(baseUrl, newProduct)
}


useEffect(() => {
    // DELETE request using axios with error handling
    axios.delete('https://northwindbackend.azurewebsites.net/api/products/catid/1')
        .then(response => setStatus('Delete successful'))
        .catch(error => {
            setErrorMessage(error.message);
            console.error('There was an error!', error);
        });
}, []);


const update = (object) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/catid/${object.productId}`, object, config)
}


export default { getAll, create, remove, update, setToken }