import { CaretLeft } from 'phosphor-react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import { NotLoggedIn } from '../components/settings/not-logged-in'
import pageStyles from './page.module.css'
import styles from './settings.module.css'
import {
  LoginState,
  getAccountEmail,
  getLoginState,
  logout,
  registerAccount,
  setAccountEmail,
} from '../storage/cloud/cloud-auth'
import { useEffect, useState } from 'react'
import { WaitingForOnetimeToken } from '../components/settings/waiting-for-onetime-token'

const Settings = () => {
  const [loginState, setLoginState] = useState<LoginState | undefined>()
  useEffect(() => {
    getLoginState().then(setLoginState)
  }, [setLoginState])

  const handleGetAccountEmail = async () => {
    return getAccountEmail()
  }
  const handleSetAccountEmail = async (email: string) => {
    return setAccountEmail(email)
  }
  const handleRegisterAccount = async () => {
    return registerAccount()
  }
  const handleCancelOnetimeToken = async () => {
    await logout()
    setLoginState(await getLoginState())
  }

  return (
    <div>
      <Header
        Left={
          <Link to={'/'} aria-label="Zurück">
            <CaretLeft className={styles.back} />
          </Link>
        }
        title="Einstellungen"
      />
      <div className={pageStyles.page}>
        {loginState === 'not logged in' && (
          <NotLoggedIn
            getAccountEmail={handleGetAccountEmail}
            setAccountEmail={handleSetAccountEmail}
            registerAccount={handleRegisterAccount}
          />
        )}
        {loginState === 'waiting for onetime token' && <WaitingForOnetimeToken cancel={handleCancelOnetimeToken} />}
      </div>
    </div>
  )
}

export default Settings
