'use client'

import { useEffect, useState } from 'react'
import useStore from '../store/useStore'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'
import styles from './PopulationChart.module.css'
import { PREFECTURES } from '../consts/prefectures'
import { ChartObject } from '../types/types'

export default function PopulationChart() {
  const { prefectureCodeList } = useStore()
  let chartData: ChartObject[] = []
  let prefectures: string[] = []
  const [stateChartData, setStateChartData] = useState<ChartObject[]>([])
  const [statePrefectures, setStatePrefectures] = useState<string[]>([])

  // RESAS APIから人口構成データを取得する
  async function fetchPopulationComposition(prefectureCodeList: number[]) {
    // RESAS APIから取得した人口構成データを格納する配列
    const populationCompositionData: ChartObject[] = []

    for (const prefectureCode of prefectureCodeList) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RESAS_POPULATION_URL}=${prefectureCode}`,
        {
          headers: {
            'X-API-KEY': `${process.env.NEXT_PUBLIC_RESAS_API_KEY}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch prefectures')
      }

      const responseData = await response.json()

      // 今回fetchした都道府県名を格納する
      const prefName = PREFECTURES[prefectureCode - 1]
      // 今回fetchした都道府県の人口情報を格納する
      const populationData = responseData.result.data[0].data
      // chartDataが空の場合は、そのまま挿入する
      if (populationCompositionData.length === 0) {
        populationData.map((data: any) => {
          const obj = {
            year: data.year,
            [prefName]: data.value
          }
          populationCompositionData.push(obj)
        })
      } else {
        // chartDataが空でない場合は、既存のデータとマージする
        populationCompositionData.map((data: any, index) => {
          data[prefName] = populationData[index].value
        })
      }
    }
    chartData = populationCompositionData
    if (chartData.length > 0) {
      prefectures = Object.keys(chartData[0]).filter((key) => key !== 'year')
    }
    setStateChartData(chartData)
    setStatePrefectures(prefectures)
  }

  useEffect(() => {
    ;(async () => {
      await fetchPopulationComposition(prefectureCodeList)
    })()
  }, [prefectureCodeList])

  return (
    <section className={styles.container}>
      {stateChartData.length > 0 ? (
        <LineChart
          width={850}
          height={350}
          margin={{ top: 10, right: 0, left: 30, bottom: 0 }}
          data={stateChartData}
        >
          {statePrefectures.map((data: any) => {
            return (
              <Line
                key={data}
                type="monotone"
                dataKey={data}
                stroke="#8884d8"
              />
            )
          })}
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      ) : (
        <p>
          チェックボックスにチェックするとその県の人口構成を見ることができます！
        </p>
      )}
    </section>
  )
}
