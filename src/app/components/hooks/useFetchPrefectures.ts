// 都道府県一覧を取得するフック
'use client'

import { useEffect, useState } from 'react';
import { getPrefectures } from '@/app/utils/api';
import { Prefecture } from '@/app/type/types';

export const useFetchPrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const data = await getPrefectures();
        setPrefectures(data.result);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };
		fetchPrefectures();
	}, []);  

    return { prefectures, loading, error };
}