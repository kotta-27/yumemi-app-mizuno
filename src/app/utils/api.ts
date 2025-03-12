const BASE_URL = "https://yumemi-frontend-engineer-codecheck-api.vercel.app";
const API_KEY = process.env.NEXT_PUBLIC_X_API_KEY;

// 都道府県一覧を取得するAPI
export const getPrefectures = async () => {
    const url = `${BASE_URL}/api/v1/prefectures`;
    const response = await fetch(url, {
    headers: {
      "X-API-KEY": API_KEY || '',
    },
    method: 'GET',
    });
    return response.json();
};

