import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PopulationDataWithPrefCode, Prefecture } from '@/app/type/types';

interface PopulationChartProps {
    data: PopulationDataWithPrefCode[];
    prefectures: Prefecture[];
}

export const PopulationChart: React.FC<PopulationChartProps> = ({ data, prefectures }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('総人口');

    // データを都道府県ごとにグループ化
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.prefCode]) {
            acc[item.prefCode] = [];
        }
        acc[item.prefCode].push(item);
        return acc;
    }, {} as Record<number, PopulationDataWithPrefCode[]>);

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#387908', '#ff0000', '#0000ff', '#00ff00', '#ff00ff', '#00ffff'];

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
        <div className="relative flex flex-col items-center w-5/6 mx-auto mt-4 border-4 border-gray-300 rounded-md py-10">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <p className="text-base sm:text-2xl font-bold bg-white dark:bg-black rounded-md p-2 border-3 border-gray-300">人口チャート</p>
            </div>
            {data.length === 0 && <p>都道府県を選択してください</p>}
            {data.length > 0 && (
                <>
                    <div className='mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2'>
                        {['総人口', '年少人口', '生産年齢人口', '老年人口'].map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`mx-1 px-4 py-2 bg-blue-500 text-white font-bold rounded-md cursor-pointer  ${selectedCategory === category ? 'opacity-100' : 'opacity-50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <ResponsiveContainer width="100%" height={400} className="p-2">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="year"
                                label={{ value: 'year（年）', position: 'insideBottom', offset: -10 }}
                            />
                            <YAxis
                                width={100}
                                tickFormatter={(value) => value.toLocaleString()}
                                label={{
                                    value: 'population（人）', position: 'insideLeft',
                                    angle: -90,
                                }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'white', color: 'black' }}
                            />
                            <Legend
                                layout="horizontal"
                                verticalAlign="bottom"
                                height={36}
                                wrapperStyle={{ paddingTop: '15px' }}
                            />
                            {Object.keys(groupedData).map((prefCode, index) => (
                                <Line
                                    key={prefCode}
                                    type="monotone"
                                    dataKey={`Prefecture ${prefCode}`}
                                    name={prefectures.find(pref => pref.prefCode === parseInt(prefCode))?.prefName}
                                    stroke={colors[index % colors.length]} 
                                    strokeWidth={2.5}
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
