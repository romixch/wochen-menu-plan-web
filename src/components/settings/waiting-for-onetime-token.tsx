import settingsStyles from './settings.module.css'

interface Props {
  cancel: () => void
}

export const WaitingForOnetimeToken = (props: Props) => {
  const handleCancel = () => {
    props.cancel()
  }
  return (
    <div className={settingsStyles.container}>
      <button className={settingsStyles.button} onClick={handleCancel}>
        Abbrechen
      </button>
    </div>
  )
}
