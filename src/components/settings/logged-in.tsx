import { useEffect, useState } from 'react'
import { getAccountEmail } from '../../storage/cloud/cloud-auth'
import settingsStyles from './settings.module.css'

type Props = {
  onLogout: () => Promise<void>
}
export const LoggedIn = (props: Props) => {
  const [email, setEmail] = useState<string | null>(null)
  useEffect(() => {
    getAccountEmail().then(setEmail)
  }, [setEmail])
  return (
    <div className={settingsStyles.container}>
      <p>Du bist als {email} angemeldet.</p>
      <button className={settingsStyles.button} onClick={props.onLogout}>
        Logout
      </button>
    </div>
  )
}
