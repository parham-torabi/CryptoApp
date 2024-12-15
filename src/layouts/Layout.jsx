import styles from './Layout.module.css'

function Layout({children}) {
  return (
    <div>
        <header className={styles.header}>
            <h1>Crypto App</h1>
            <p><b>Picasso</b> | ReactJs</p>
        </header>
        {children}
        <footer className={styles.footer}>
            <h1>Developed By Picasso With 🖤</h1>
        </footer>
    </div>
  )
}

export default Layout