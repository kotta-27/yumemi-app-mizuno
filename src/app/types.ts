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