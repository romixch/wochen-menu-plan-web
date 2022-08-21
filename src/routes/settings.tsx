import { CaretLeft } from "phosphor-react"
import { Link } from "react-router-dom"
import Header from "../components/header"
import Login from "../components/settings/login"
import styles from "./settings.module.css"

const Settings = () => <div>
    <Header Left={<Link to={"/"} aria-label="Zurück"><CaretLeft className={styles.back} /></Link>} title="Einstellungen" />
    <div>
        <Login />
    </div>
</div>

export default Settings