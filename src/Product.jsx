import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

// props on nimeltään customer
const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

// Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteProduct = (product) => {
    let vastaus = window.confirm(`Remove Product ${product.productName}`)

    if (vastaus === true) {
    ProductService.remove(product.productName)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed product ${product.productName}`)
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
        reloadNow(!reload)
        }
        
            }
        )
        .catch(error => {
            setMessage(error)
            setIsPositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
    
            setTimeout(() => {
              setShowMessage(false)
             }, 6000)
          })

    } // Jos poisto halutaankin perua
    else {
    setMessage('Poisto peruttu onnistuneesti.')
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
    }
}

  return (
    <div className='customerDiv'>
        
       <h4 onClick={() => setShowDetails(!showDetails)}>
           {product.productName} , {product.country}
        </h4>

       {showDetails && <div className="productDetails">

                <h3>{product.productName}</h3>

                <button onClick={() => deleteProduct(product)}>Delete</button>
                <button onClick={() => editProduct(product)}>Edit</button>

                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.productName}</td>
                            <td>{product.country}</td>
                        </tr>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default Product