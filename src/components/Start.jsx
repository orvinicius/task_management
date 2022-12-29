import { useState } from 'react'
import styles from './Start.module.css'

import Dashboard from './Dashboard'


const Start = ({ startManagement }) => {


    const [userName, setUserName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        startManagement()

        console.log(userName)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className={styles.input}>
                    <input type="text" required placeholder="What's your name?" onChange={(e) => setUserName(e.target.value)} value={userName} />
                </label>
                <label>
                    <button>Done</button>
                </label>
            </form>
        </>

    )
}

export default Start