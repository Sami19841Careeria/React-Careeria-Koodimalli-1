import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'

const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

// Komponentin tilan määritys

const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstname)
const [newLastname, setNewLastname] = useState(muokattavaUser.lastname)
const [newEmail, setNewEmail] = useState(muokattavaUser.email)
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUsername, setNewUsername] = useState(muokattavaUser.username)
const [newPassword, setNewPassword] = useState(muokattavaUser.password)


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault()
    var newUser = {
      // userId: newUserId,
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail,
      accesslevelId: parseInt(newAccesslevelId),
      username: newUsername,
      password: md5(newPassword) // Salataan md5 kirjaston metodilla
  }
    
    UserService.update(newUser)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited User: " + newUser.firstname)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
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


  return (
    <div id="edit">
       <h2>User Edit</h2>

       <form onSubmit={handleSubmit}>
            {/* <div>
                <label>User ID</label>
                <input type="text" value={newUserId} disabled/>
            </div> */}
            <div>
            <label>First Name</label>
                <input type="text" value={newFirstname} placeholder="First name"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
            <label>Last Name</label>
                <input type="text" value={newLastname} placeholder="Last name"
                    onChange={({ target }) => setNewLastname(target.value)} required />
            </div>
            <div>
            <label>Email</label>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
            <label>Access Level</label>
                <input type="number" value={newAccesslevelId} placeholder="Access level"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>
            <div>
            <label>User Name</label>
                <input type="text" value={newUsername} placeholder="Username"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
            <div>
            <label>Password</label>
                <input type="password" value={newPassword} placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
            
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default UserEdit
