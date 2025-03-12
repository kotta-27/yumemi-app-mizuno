// 都道府県選択コンポーネント
'use client'

import { Checkbox } from '../atoms/Checkbox';
import { useFetchPrefectures } from '../hooks/useFetchPrefectures';
import { Prefecture } from '@/app/type/types';

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
        <div>
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
        </div>
    );
};



