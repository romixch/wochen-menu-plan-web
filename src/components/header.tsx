import styles from './header.module.css'

interface Props {
    title: string
    Left?: JSX.Element
    Right?: JSX.Element
}

const Header = ({ Left, title, Right }: Props) => <div className={styles.container}>
    <div className={`${styles.elementContainer} ${styles.left}`}>{Left}</div>
    <div className={`${styles.elementContainer} ${styles.center}`}>{title}</div>
    <div className={`${styles.elementContainer} ${styles.right}`}>{Right}</div>
</div>

export default Header