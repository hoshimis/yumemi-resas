import { FC } from 'react'
import styles from './Spinner.module.css'

const Spinner: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spiner} />
    </div>
  )
}

export default Spinner
