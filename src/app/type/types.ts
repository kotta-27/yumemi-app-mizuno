// 都道府県の型
export type Prefecture = {
    prefCode: number;
    prefName: string;
};

// 都道府県一覧のレスポンス型
export type PrefecturesResponse = {
    message: null | string;
    result: Prefecture[];
};

// 年ごとの人口データの型
export type PopulationData = {
    year: number;
    value: number;
    rate?: number;
};

// 人口構成データの型
export type PopulationCompositionPerYear = {
    boundaryYear: number;
    data: {
        label: string;
        data: PopulationData[];
    }[];
};

// 人口構成データのレスポンス型
export type PopulationCompositionResponse = {
    message: null | string;
    result: PopulationCompositionPerYear;
};

// predCodeを含む人口データの型
export type PopulationDataWithPrefCode = {
    prefCode: number;
    data: {
        label: string;
        data: PopulationData[];
    }[];
};

