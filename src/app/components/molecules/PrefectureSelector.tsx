// 都道府県選択コンポーネント
'use client'

import { Checkbox } from '../atoms/Checkbox';
import { useFetchPrefectures } from '../hooks/useFetchPrefectures';
import { Prefecture } from '@/app/type/types';
import { LoadingSpinner } from '../atoms/LoadingSpiner';

export const PrefectureSelector = ({ selectedPrefectures, onSelect }: { selectedPrefectures: Prefecture[], onSelect: (prefectures: Prefecture[]) => void }) => {
    const { prefectures, loading, error } = useFetchPrefectures();

    const handleCheckboxChange = (prefecture: Prefecture, checked: boolean) => {
        if (checked) {
            onSelect([...selectedPrefectures, prefecture]);
        } else {
            onSelect(selectedPrefectures.filter((p) => p.prefCode !== prefecture.prefCode));
        }
    };

    return (
        <div className="w-5/6 sm:w-2/3 mx-auto mt-4 pb-10">
            <h2 className="mb-2 pb-2 text-2xl border-gray-700 font-bold border-b-2 ">都道府県</h2>
            {loading && <LoadingSpinner />}
            {error && <p>Error: {error.message}</p>}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {prefectures.map((prefecture) => (
                    <Checkbox
                        key={prefecture.prefCode}
                        checked={selectedPrefectures.some((p) => p.prefCode === prefecture.prefCode)}
                        onChange={(checked) => handleCheckboxChange(prefecture, checked)}
                        prefecture={prefecture}
                    />
                ))}
            </div>
        </div>
    );
};



