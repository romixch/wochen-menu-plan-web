import settingsStyles from './settings.module.css'
import styles from './not-logged-in.module.css'
import { FocusEventHandler, useEffect, useState } from 'react'
import { Spinner } from 'phosphor-react'

interface Props {
  getAccountEmail: () => Promise<string | null>
  setAccountEmail: (email: string) => Promise<void>
  registerAccount: () => Promise<void>
}

export const NotLoggedIn = ({ getAccountEmail, setAccountEmail, registerAccount }: Props) => {
  const [email, setEmail] = useState<string | null>(null)
  const [registrationCallRunning, setRegistrationCallRunning] = useState(false)

  useEffect(() => {
    getAccountEmail().then((accountEmail) => setEmail(accountEmail))
  }, [getAccountEmail])

  const handleOnEmailBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    setAccountEmail(event.target.value)
  }
  const handleOnLogin = async () => {
    setRegistrationCallRunning(true)
    await registerAccount()
    setRegistrationCallRunning(false)
  }

  return (
    <div className={settingsStyles.container}>
      <h1>Login</h1>
      <p>Du kannst dich hier mit deiner E-Mail-Adresse anmelden, um von folgenden Funktionen zu profitieren:</p>
      <ul>
        <li>Backup deiner Daten</li>
        <li>Synchronisation zwischen mehreren Geräten</li>
        <li>Menüs mit anderen Nutzern teilen</li>
      </ul>
      <div className={styles.form}>
        <label htmlFor="email">E-Mail</label>
        <input id="email" type="email" defaultValue={email || ''} onBlur={handleOnEmailBlur} />
        <button className={settingsStyles.button} onClick={handleOnLogin} disabled={registrationCallRunning}>
          {registrationCallRunning && <Spinner />} Anmelden
        </button>
      </div>
    </div>
  )
}
