// 都道府県一覧を取得するAPIのレスポンスの型定義
export type Prefecture = {
  message: string | null
  result: [
    {
      prefCode: number
      prefName: string
    }
  ]
}

// 人口構成を取得す津APIのレスポンスの型定義
export type PopulationComposition = {
  message: string | null
  result: {
    boundaryYear: number
    data: [
      {
        label: string
        data: [
          {
            year: number
            value: number
          }
        ]
      }
    ]
  }
}

// chartの表示に必要なデータの型定義
export type ChartObject = {
  year: number
  [key: string]: number
}
