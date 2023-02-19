import styles from './NavBar.module.css'
import { FC } from 'react'

const NavBar: FC = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Title</h1>
      </header>
    </>
  )
}

export default NavBar
