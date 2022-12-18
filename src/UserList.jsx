import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'
import User from './User'

const UserList = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [users, setUsers] = useState([])
const [showUsers, setShowUsers] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")





// UseEffect ajetaan aina alussa kerran
useEffect(() => {
  UserService.getAll()
  .then(data => {
    setUsers(data)
        })
    },[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )

  //Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}

const editUser = (user) => {
  setMuokattavaUser(user)
  setMuokkaustila(true)
}

const accesslevelId = localStorage.getItem("accesslevelId")
// console.log(accesslevelId)
    return (
        <>
            <h1><nobr style={{ cursor: 'pointer' }}
                    onClick={() => setShowUsers(!showUsers)}>Users</nobr>
    
                    {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>
    
                    {!lisäystila && !muokkaustila &&
                    <input placeholder="Search by Last name" value={search} onChange={handleSearchInputChange} />
                    }
    
                    {lisäystila && <UserAdd setLisäystila={setLisäystila} 
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                    />}
    
                    {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila} 
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                    muokattavaUser={muokattavaUser}
                    />}
    
    
            {
                (accesslevelId === "2") && !lisäystila && !muokkaustila && showUsers && users && users.map(u =>
                  {
                    const lowerCaseName = u.userName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                    <User key={u.userId} user={u} reloadNow={reloadNow} reload={reload}
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                    editUser={editUser}
                    />
                  )
                        }
                      }
                )
                    }
    
        </>
      )
}

export default UserList
