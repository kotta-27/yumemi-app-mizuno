'use client';

import { useState } from 'react';
import { PrefectureSelector } from "./components/organisms/PrefectureSelector";
import { PopulationChart } from "./components/organisms/PopulationChart";
import { Prefecture } from '@/app/type/types';
import { useFetchPopulation } from './components/hooks/useFetchPopulation';

export default function Home() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);
  const { populationDataList, loading, error } = useFetchPopulation(selectedPrefectures);

  const handlePrefectureSelect = (prefectures: Prefecture[]) => {
    setSelectedPrefectures(prefectures);
  };

  return (
    <div className="container mx-auto px-4">
      <main className="">
        <PrefectureSelector
          selectedPrefectures={selectedPrefectures}
          onSelect={handlePrefectureSelect}
        />
        {populationDataList && <PopulationChart data={populationDataList} />}
      </main>
      <footer>
      </footer>
    </div>
  );
}
