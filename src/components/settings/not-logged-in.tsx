import settingsStyles from "./settings.module.css"
import styles from './not-logged-in.module.css'
import { useEffect, useState } from "react"
import { getAccountEmail } from "../../storage/cloud/cloud-auth"

export const NotLoggedIn = () => {
    const [email, setEmail] = useState<string | null>(null)

    useEffect(() => {
        getAccountEmail().then((accountEmail) => setEmail(accountEmail))
    }, [])

    const handleOnEmailBlur = () => { }
    const handleOnLogin = () => { }

    return <div className={settingsStyles.container}>
        <h1>Login</h1>
        <p>Du kannst dich hier mit deiner E-Mail-Adresse anmelden, um von folgenden Funktionen zu profitieren:</p>
        <ul>
            <li>Backup deiner Daten</li>
            <li>Synchronisation zwischen mehreren Geräten</li>
            <li>Menüs mit anderen Nutzern teilen</li>
        </ul>
        <div className={styles.form}>
            <label htmlFor="email">E-Mail</label>
            <input id="email" defaultValue={email || ''} onBlur={handleOnEmailBlur} />
            <button className={settingsStyles.button} onClick={handleOnLogin}>Anmelden</button>
        </div>
    </div>
}
