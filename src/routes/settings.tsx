import { CaretLeft } from "phosphor-react"
import { Link } from "react-router-dom"
import Header from "../components/header"
import styles from "./settings.module.css"

const Settings = () => <div>
    <Header Left={<Link to={"/"} aria-label="Zurück"><CaretLeft className={styles.back} /></Link>} title="Einstellungen" />
</div>

export default Settings