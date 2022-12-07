import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'

// props on nimeltään User
const User = ({user, editUser, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

// Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteUser = (user) => {
    let vastaus = window.confirm(`Remove User ${user.userName}`)

    if (vastaus === true) {
    UserService.remove(user.userId)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed user ${user.userName}`)
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
    <div className='userDiv'>
        
       <h4 onClick={() => setShowDetails(!showDetails)}>
           {user.userId} , {user.userName}
        </h4>

       {showDetails && <div className="userDetails">

                <h3>{user.userName}</h3>

                <button onClick={() => deleteUser(user)}>Delete</button>
                <button onClick={() => editUser(user)}>Edit</button>

                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.userId}</td>
                            <td>{user.userName}</td>
                        </tr>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default User