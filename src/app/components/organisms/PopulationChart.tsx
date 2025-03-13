import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PopulationDataWithPrefCode } from '@/app/type/types';

interface PopulationChartProps {
    data: PopulationDataWithPrefCode[];
}

export const PopulationChart: React.FC<PopulationChartProps> = ({ data }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('総人口');

    // データを都道府県ごとにグループ化
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.prefCode]) {
            acc[item.prefCode] = [];
        }
        acc[item.prefCode].push(item);
        return acc;
    }, {} as Record<number, PopulationDataWithPrefCode[]>);

    // 色の配列を用意
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#387908'];

    // 共通の year を基準にしたデータを作成
    const years = Array.from(new Set(data.flatMap(d => d.data.flatMap(category => category.data.map(item => item.year))))).sort((a, b) => a - b);

    const chartData = years.map(year => {
        const entry: Record<string, number | string | undefined> = { year };
        Object.entries(groupedData).forEach(([prefCode, prefData]) => {
            const population = prefData.flatMap(d => d.data).find(category => category.label === selectedCategory)?.data.find(d => d.year === year);
            entry[`Prefecture ${prefCode}`] = population ? population.value : undefined;
        });
        return entry;
    });

    return (
        <div className="flex flex-col items-center w-5/6 mx-auto mt-4">
            <p>人口チャート</p>
            {data.length === 0 && <p>都道府県を選択してください</p>}
            {data.length > 0 && (
                <>
                    <div>
                        {['総人口', '年少人口', '生産年齢人口', '老年人口'].map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`bg-blue-500 text-white px-4 py-2 rounded-md mx-1 ${selectedCategory === category ? 'opacity-100' : 'opacity-50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData}>
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {Object.keys(groupedData).map((prefCode, index) => (
                                <Line
                                    key={prefCode}
                                    type="monotone"
                                    dataKey={`Prefecture ${prefCode}`}
                                    name={`Prefecture ${prefCode}`}
                                    stroke={colors[index % colors.length]} // 色を循環させる
                                    connectNulls
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};
