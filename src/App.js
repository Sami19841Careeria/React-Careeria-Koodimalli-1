// React importtia ei tarvita enää tässä komponentissa kun ei ole statea
import './App.css'
import Laskuri from './Laskuri'
// Viesti import poistettu koska sitä toimintoa ei sisällytetä lopulliseen versioon
import Posts from './Posts'
import CustomerList from './CustomerList'
//Message import poistettu, koska se importataan nyt list tason komponentteihin jokaiseen erikseen
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
  
  return (
    <div className="App">
      <Router>        

          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Link to={'/Customers'} className='nav-link'>Customers</Link>
                <Link to={'/Laskuri'} className='nav-link'>Laskuri</Link>
                <Link to={'/Posts'} className='nav-link'>Typicode posts</Link>
            </Nav>
          </Navbar>
          
          <h2>Northwind Traders</h2>

          <Switch>
                <Route path="/Customers" component={CustomerList}/>
                <Route path="/Laskuri" component={Laskuri}/>
                <Route path="/Posts" component={Posts}/>

          </Switch>
           
      </Router>
          
      </div>
  )
}

export default App
