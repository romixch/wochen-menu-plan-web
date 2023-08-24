import { ChangeEventHandler, useEffect, useState } from 'react'
import settingsStyles from './settings.module.css'
import { getAccountEmail } from '../../storage/cloud/cloud-auth'

interface Props {
  cancel: () => void
  setOnetimeToken: (token: string) => Promise<void>
}

export const WaitingForOnetimeToken = (props: Props) => {
  const [email, setEmail] = useState<string | null>(null)
  useEffect(() => {
    getAccountEmail().then(setEmail)
  }, [])
  const handleCancel = () => {
    props.cancel()
  }
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const code = e.target.value
    if (code.length === 6) {
      props.setOnetimeToken(code)
    }
  }
  return (
    <div className={settingsStyles.container}>
      <p>Wir haben gerade eine E-Mail mit einem Einmal-Code an {email} verschickt. Bitte trage diesen Code hier ein:</p>
      <input placeholder="6 stelliger Code von E-Mail" id="onetomeToken" onChange={handleOnChange} />
      <p>Keine E-Mail erhalten?</p>
      <p>
        Es kann einige Minuten dauern, bis die E-Mail bei dir ankommt. Falls du keine E-Mail erhälst, kannst du den
        Login-Prozess abbrechen und noch einmal versuchen.
      </p>

      <button className={settingsStyles.button} onClick={handleCancel}>
        Abbrechen
      </button>
    </div>
  )
}
