import { useEffect, useState } from 'react';
import { getPopulationData } from '@/app/utils/api';
import { Prefecture, PopulationDataWithPrefCode } from '@/app/type/types';

export const useFetchPopulation = (selectedPrefectures: Prefecture[]) => {
    const [dataForChart, setDataForChart] = useState<PopulationDataWithPrefCode[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [cache, setCache] = useState<Record<number, PopulationDataWithPrefCode>>({});

    useEffect(() => {
        const fetchPopulationData = async () => {
            try {
                const newCache: Record<number, PopulationDataWithPrefCode> = {};
                const prefecturesToFetch = selectedPrefectures.filter(prefecture => !cache[prefecture.prefCode]);
                const data = await Promise.all(prefecturesToFetch.map(async (prefecture) => {
                    const response = await getPopulationData(prefecture);
                    newCache[prefecture.prefCode] = {
                        prefCode: prefecture.prefCode,
                        data: response.result.data
                    };
                    return newCache[prefecture.prefCode];
                }));
                console.log("data", data);
                const updatedCache = { ...cache, ...newCache };
                setDataForChart(selectedPrefectures.map(prefecture => updatedCache[prefecture.prefCode]));
                setCache(updatedCache);
            } catch (err) {
                setError(err as Error);
            }
        };

        if (selectedPrefectures.length > 0) {
            fetchPopulationData();
        } else {
            setDataForChart([]);
        }
    }, [selectedPrefectures]);

    return { dataForChart, error };
};
