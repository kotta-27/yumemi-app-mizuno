import { useEffect, useState } from 'react';
import { getPopulationData } from '@/app/utils/api';
import { Prefecture, PopulationDataWithPrefCode } from '@/app/type/types';

export const useFetchPopulation = (selectedPrefectures: Prefecture[]) => {
    const [populationDataList, setPopulationDataList] = useState<PopulationDataWithPrefCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPopulationData = async () => {
            try {
                const data = await Promise.all(selectedPrefectures.map(async (prefecture) => {
                    const response = await getPopulationData(prefecture);
                    return response.result.data.flatMap((populationCategory: { label: string, data: any[] }) => 
                        populationCategory.data.map((item: { year: number, value: number }) => ({
                            year: item.year,
                            value: item.value,
                            prefCode: prefecture.prefCode,
                            label: populationCategory.label
                        }))
                    ); 
                }));
                setPopulationDataList(data.flat());
                setLoading(false);
            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        };

        if (selectedPrefectures.length > 0) {
            fetchPopulationData();
        } else {
            setPopulationDataList([]);
            setLoading(false);
        }
    }, [selectedPrefectures]);

    return { populationDataList, loading, error };
};
