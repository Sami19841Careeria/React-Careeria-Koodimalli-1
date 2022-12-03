import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

const ProductEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct}) => {

// Komponentin tilan määritys

    const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
    const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
    const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)

    const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
    const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)


// onSubmit tapahtumankäsittelijä funktio
   
const handleSubmit = (event) => {
    event.preventDefault()
    var newProduct = {
        productId: newProductId,
        productName: newProductName,
        supplierId: newSupplierId,
        categoryId: newCategoryId,
        quantityPerUnit: newQuantityPerUnit,
        unitPrice: newUnitPrice,
        unitsInStock: newUnitsInStock
    }    

    ProductService.update(newProduct)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited Product: " + newProduct.productName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
    }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }

  return (
    <div id="edit">
       <h2>Product edit</h2>

       <form onSubmit={handleSubmit}>
       <div>
                <input type="text" value={newProductId} disabled />
            </div>
            <div>
                <label>Product Name</label>
                <input type="text" value={newProductName} placeholder="Product Name"
                    onChange={({ target }) => setNewProductName(target.value)} />
            </div>
            <div>
                <label>Supplier ID</label>
                <input type="text" value={newSupplierId} placeholder="Supplier ID"
                    onChange={({ target }) => setNewSupplierId(target.value)} />
            </div>
            <div>
                <label>Category ID</label>
                <input type="text" value={newCategoryId} placeholder="Category ID"
                    onChange={({ target }) => setNewCategoryId(target.value)} />
            </div>
            <div>
                <label>Quantity Per Unit</label>
                <input type="text" value={newQuantityPerUnit} placeholder="Quantity Per Unit"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
            </div>
            <div>
                <label>Unit Price</label>
                <input type="text" value={newUnitPrice} placeholder="Unit Price"
                    onChange={({ target }) => setNewUnitPrice(target.value)} />
            </div>
            <div>
                <label>Units In Stock</label>
                <input type="text" value={newUnitsInStock} placeholder="Units In Stock"
                    onChange={({ target }) => setNewUnitsInStock(target.value)} />
            </div>
  
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default ProductEdit
