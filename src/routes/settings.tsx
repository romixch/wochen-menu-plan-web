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
  requestAccessToken,
  setAccountEmail,
} from '../storage/cloud/cloud-auth'
import { useEffect, useState } from 'react'
import { WaitingForOnetimeToken } from '../components/settings/waiting-for-onetime-token'
import { LoggedIn } from '../components/settings/logged-in'

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
    await registerAccount()
    setLoginState(await getLoginState())
  }
  const handleSetOnetimeToken = async (oneTimeToken: string) => {
    await requestAccessToken(oneTimeToken)
    setLoginState(await getLoginState())
  }
  const handleCancelOnetimeToken = async () => {
    await logout()
    setLoginState(await getLoginState())
  }
  const handleLogout = async () => {
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
        {loginState === 'waiting for onetime token' && (
          <WaitingForOnetimeToken cancel={handleCancelOnetimeToken} setOnetimeToken={handleSetOnetimeToken} />
        )}
        {loginState === 'logged in' && <LoggedIn onLogout={handleLogout} />}
      </div>
    </div>
  )
}

export default Settings
