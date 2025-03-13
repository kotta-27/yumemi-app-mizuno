import { Prefecture, PrefecturesResponse, PopulationCompositionResponse } from "@/app/type/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_X_API_KEY;

// 都道府県一覧を取得するAPI
export const getPrefectures = async (): Promise<PrefecturesResponse> => {
    const url = `${BASE_URL}/api/v1/prefectures`;
    const response = await fetch(url, {
    headers: {
      "X-API-KEY": API_KEY || '',
    },
    method: 'GET',
    });
    const data = await response.json();
    return data;
};

// 都道府県の人口データを取得するAPI
export const getPopulationData = async (prefecture: Prefecture): Promise<PopulationCompositionResponse> => {
    const url = `${BASE_URL}/api/v1/population/composition/perYear?prefCode=${prefecture.prefCode}`;
    const response = await fetch(url, {
        headers: {
            "X-API-KEY": API_KEY || '',
        },
    });
    const data = await response.json();
    return data;
};