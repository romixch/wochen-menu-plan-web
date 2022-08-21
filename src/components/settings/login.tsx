import { FocusEventHandler, useState } from "react"
import useSettings from "../../storage/settings-store"
import styles from './login.module.css'

const Login = () => {
    const login = useSettings((store) => store.login)
    const setLogin = useSettings((store => store.setLogin))
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [accessKey, setAccessKey] = useState<string | undefined>(undefined)

    const handleOnEmailBlur: FocusEventHandler<HTMLInputElement> = (e) => setEmail(e.target.value)
    const handleOnAccessKeyBlur: FocusEventHandler<HTMLInputElement> = (e) => setAccessKey(e.target.value)

    const handleOnSave = () => {
        if (email && accessKey) {
            setLogin(email, accessKey)
        }
    }

    return <div>
        <h2>Login</h2>
        <div className={styles.form}>
            <label htmlFor="email">E-Mail</label>
            <input id="email" defaultValue={login?.email} onBlur={handleOnEmailBlur} />
            <label htmlFor="access-key">Access-Key</label>
            <input id="access-key" defaultValue={login?.accessKey} onBlur={handleOnAccessKeyBlur} />
            <button onClick={handleOnSave}>Speichern</button>
        </div>
    </div>
}

export default Login