import { NextPage } from 'next'
import PrefectureGroup from './components/PrefectureGroup'
import PopulationChart from './components/PopulationChart'

const Home: NextPage = () => {
  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <PrefectureGroup />
      <PopulationChart />
    </main>
  )
}

export default Home
