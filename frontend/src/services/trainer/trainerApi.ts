// src/services/trainer/trainerApi.ts
import axios from 'axios';

export const getTrainerList = async (): Promise<TrainerListType[]> => {
  try {
    const response = await axios.get<TrainerListType[]>('http://192.168.31.47/api/lesson/');
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при загрузке данных');
  }
};

export const getTrainerById = async (itemId: number) => {
  try {
    const response = await axios.get<LessonDetailType>(`http://192.168.31.47/api/lesson/${itemId}/`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при загрузке данных');
  }
};
