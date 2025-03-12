// 都道府県選択コンポーネント
'use client'

import { useState } from 'react';
import { Checkbox } from '../atoms/Checkbox';
import { useFetchPrefectures } from '../hooks/useFetchPrefectures';
import { Prefecture } from '@/app/types';

export const PrefectureSelector = () => {
    const { prefectures, loading, error } = useFetchPrefectures();
    const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);

    const handleCheckboxChange = (prefecture: Prefecture, checked: boolean) => {
        if (checked) {
            setSelectedPrefectures([...selectedPrefectures, prefecture]);
        } else {
            setSelectedPrefectures(selectedPrefectures.filter((p) => p.prefCode !== prefecture.prefCode));
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {prefectures.map((prefecture) => (
                <Checkbox
                    key={prefecture.prefCode}
                    checked={selectedPrefectures.some((p) => p.prefCode === prefecture.prefCode)}
                    onChange={(checked) => handleCheckboxChange(prefecture, checked)}
                    prefecture={prefecture}
                />
            ))}
        </div>
    );
};



