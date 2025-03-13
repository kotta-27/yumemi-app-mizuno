'use client';

import { useState } from 'react';
import { PrefectureSelector } from "./components/molecules/PrefectureSelector";
import { PopulationChart } from "./components/organisms/PopulationChart";
import { Prefecture } from '@/app/type/types';
import { useFetchPopulation } from './components/hooks/useFetchPopulation';
import { Header } from './components/organisms/Header';

export default function Home() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);
  const { dataForChart, error } = useFetchPopulation(selectedPrefectures);

  const handlePrefectureSelect = (prefectures: Prefecture[]) => {
    setSelectedPrefectures(prefectures);
  };

  return (
    <div className="w-full">
      <main className="">
        <Header />
        <PrefectureSelector
          selectedPrefectures={selectedPrefectures}
          onSelect={handlePrefectureSelect}
        />
        {error && <p>Error: {error.message}</p>}
        {dataForChart && <PopulationChart data={dataForChart} prefectures={selectedPrefectures} />}
      </main>
      <footer>
      </footer>
    </div>
  );
}
