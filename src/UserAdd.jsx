import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'
import { useEffect } from 'react'

const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys
// Id arvo määritellään tietokannassa automaattisesti,
// emme anna sitä itse
const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [newConfirmPassword, setNewConfirmPassword] = useState('')

const [validMatch, setValidMatch] = useState(false)

useEffect(() => {
  console.log(newPassword)
  const match = newPassword === newConfirmPassword
  setValidMatch(match)
}, [newPassword, newConfirmPassword])

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newUser = {
        firstName: newFirstname,
        lastName: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId),
        userName: newUsername,
        password: md5(newPassword), // Salataan md5 kirjaston metodilla
        confirmPassword: md5(newConfirmPassword)
    }
    
    console.log(newUser)

    UserService.create(newUser)
    .then(response => {
      if (response.status === 200) {
       setMessage(`Added new User: ${newUser.firstName} ${newUser.lastName}`)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setLisäystila(false)
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
    <div id="addNew">
       <h2>User add</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newFirstname} placeholder="First name"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Last name"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <input type="number" value={newAccesslevelId} placeholder="Access level"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>
            <div>
                <input type="text" value={newUsername} placeholder="Username"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
            <div>
                <input type="password" id="password" value={newPassword} placeholder="Password" required
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
            <div>
                <input type="password" id="confirm_pwd" value={newConfirmPassword} placeholder="Confirm Password" required
                    onChange={({ target }) => setNewConfirmPassword(target.value)} />
            </div>
          
            
         {/* <input type='submit' value='save' /> */}
         <button disabled={newPassword !== newConfirmPassword  ? true : false}>Save</button>
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default UserAdd
