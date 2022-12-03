import './App.css'
import React, {useState, useEffect} from 'react'
import ProductServices from './services/Product'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [products, setProducts] = useState([])
const [showProducts, setShowProducts] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState(false)
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
useEffect(() => {

  const token = localStorage.getItem('token')
        ProductServices
            .setToken(token)
            
  ProductServices.getAll()
  .then(data => {
    setProducts(data)
})
},[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
)

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSearchInputChange = (event) => {
    setShowProducts(true)
    setSearch(event.target.value.toLowerCase())
}

const editProduct = (products) => {
  setMuokattavaProduct(products)
  setMuokkaustila(true)
}

  return (
    <>
        <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowProducts(!showProducts)}>Products</nobr>

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                {!lisäystila && !muokkaustila &&
                <input placeholder="Search by product name" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <ProductAdd setLisäystila={setLisäystila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}

                {muokkaustila && <ProductEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaProduct={muokattavaProduct}
                />}

        {
            !lisäystila && !muokkaustila && showProducts && products && products.map(p =>
              {
                const lowerCaseName = p.productName.toLowerCase()
                if (lowerCaseName.indexOf(search) > -1) {
                    return(
                <Product key={p.productId} product={p} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editProduct={editProduct}
                />
              )
                    }
                  }
            )
        }

    </>
  )
}

export default ProductList
