import { create } from 'zustand'

// storeの型定義
type State = {
  prefectureCodeList: number[]
  addPrefectureCode: (prefectureCode: number) => void
  removePrefectureCode: (prefectureCode: number) => void
  resetPrefectureCode: () => void
}

const useStore = create<State>((set) => ({
  // グラフに描画する都道府県コードを格納する配列
  prefectureCodeList: [],

  addPrefectureCode: (prefectureCode: number) =>
    set((state) => ({
      prefectureCodeList: [...state.prefectureCodeList, prefectureCode]
    })),

  removePrefectureCode: (prefectureCode: number) =>
    set((state) => ({
      prefectureCodeList: state.prefectureCodeList.filter(
        (i) => i !== prefectureCode
      )
    })),

  resetPrefectureCode: () => set({ prefectureCodeList: [] })
}))

export default useStore
