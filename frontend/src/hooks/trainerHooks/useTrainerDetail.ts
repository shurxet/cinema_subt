// src/hooks/trainerHooks/useTrainerDetail.ts
import { useState, useEffect } from 'react';
import {getTrainerById} from "../../services/trainer/trainerApi.ts";


const useTrainerDetail = (itemId: number | null) => {
  const [lesson, setLesson] = useState<LessonDetailType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (itemId !== null) {
      getTrainerById(itemId)
        .then((data) => {
          setLesson(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Ошибка при загрузке данных');
          setLoading(false);
        });
    }
  }, [itemId]);

  return { lesson, loading, error };
};

export default useTrainerDetail;
