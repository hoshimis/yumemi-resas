'use client'

import { FC, useState } from 'react'
import styles from './PrefectureItem.module.css'
import useStore from '../store/useStore'

type Props = {
  prefecture: {
    prefCode: number
    prefName: string
  }
}

const PrefectureItem: FC<Props> = ({ prefecture }) => {
  const { prefCode, prefName } = prefecture
  const [isSelected, setIsSelected] = useState(false)
  const { addPrefectureCode, removePrefectureCode } = useStore((state) => ({
    addPrefectureCode: state.addPrefectureCode,
    removePrefectureCode: state.removePrefectureCode
  }))

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked)
    if (e.target.checked) {
      addPrefectureCode(prefCode)
    } else {
      removePrefectureCode(prefCode)
    }
  }

  return (
    <label className={styles.prefecture_item}>
      <input
        className={styles.prefecture_checkbox}
        type="checkbox"
        name={prefName}
        value={prefName}
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      {prefName.length === 3 ? '　' + prefName : prefName}
    </label>
  )
}

export default PrefectureItem
