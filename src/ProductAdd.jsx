import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'


const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys

const [newProductName, setNewProductName] = useState('')
const [newProductId, setNewProductId] = useState('')
const [newSupplierId, setNewSupplierId] = useState('')
const [newCategoryId, setNewCategoryId] = useState('')
const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')

const [newUnitPrice, setNewUnitPrice] = useState('')
const [newUnitsInStock, setNewUnitsInStock] = useState('')
const [newDiscontinued, setNewDiscontinued] = useState(false)

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newProduct = {
        // productId: newProductId,
        productName: newProductName,
        // supplierId: newSupplierId,
        // categoryId: newCategoryId,
        quantityPerUnit: newQuantityPerUnit,
        unitPrice: newUnitPrice,
        unitsInStock: newUnitsInStock,
        // discontinued: newDiscontinued
    }
    
    // const token = localStorage.getItem('token')
    //     ProductService
    //         .setToken(token)

    ProductService.create(newProduct)
    .then(response => {
      if (response.status === 200) {
       setMessage("Added new Product: " + newProduct.productName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setLisäystila(false)
    }

      })
      .catch(error => {
        setMessage(error.message)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }
    const handleChange = (e) => {
      setNewDiscontinued(e.target.value)
      console.warn(e.target.value)
    }

  return (
    <div id="addNew">
       <h2>Product add</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newProductName} placeholder="Product Name"
                    onChange={({ target }) => setNewProductName(target.value)} />
            </div>
            <div>
                <input type="text" value={newQuantityPerUnit} placeholder="Quantity Per Unit"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
            </div>
            <div>
                <input type="text" value={newUnitPrice} placeholder="Unit Price"
                    onChange={({ target }) => setNewUnitPrice(target.value)} />
            </div>
            <div>
                <input type="text" value={newUnitsInStock} placeholder="Units In Stock"
                    onChange={({ target }) => setNewUnitsInStock(target.value)} />
            </div>
            <div>
                <span>
                <label>Continued</label>
                <input type="radio" value="not_discontinued" checked={newDiscontinued==="not_discontinued"} onChange={handleChange} />
                  </span>
            </div>
            <div>
                <span>
                <label>Discontinued</label>
                <input type="radio" value="discontinued" checked={newDiscontinued==="discontinued"} onChange={handleChange} />
                  </span>
            </div>
                
  
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}


export default ProductAdd
