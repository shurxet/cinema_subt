/// <reference types="vite/client" />
// src/vite-env.d.ts


interface Series {
  id: number;
  series_number: number
  title: string;
}


interface Genre {
  id: number;
  title: string;
}

interface Season {
  id: number;
  title: string;
  series: Series[];
  season_number: number;
}

interface Countries {
    title: string;
}

interface MovieDetailType {
  seasons: Season[];
  status: string;
  duration: number;
  countries?: Countries[];
  release_year: number;
  rating: number;
  plot: string;
  title: string;
  poster: string;
  genres?: Genre[];
}


interface MovieListType {
  id: number;
  title: string;
  poster: string;
}


// Расширение интерфейса Window
interface Window {
  responseData: MovieDetailType;
}


interface UserProfileType {
  id: number,
  username: string,
  first_name: string | null,
  last_name: string | null,
  age: number | null
  email: string | null,
  phone: string | null
  image: string | null
}


interface ServerErrorData {
    [key: string]: string[]; // Массив сообщений об ошибках для каждого поля
}


interface ResponseError {
    status: number;
    data: ServerErrorData;
}


interface ErrorsFomUpdateProfile {
    general?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    age?: string;
    email?: string;
    phone?: string;
}


interface TrainerListType {
  id: number;
  title: string;
  description: string
  image: string | null;
}


interface WordAnalysis {
  id: number;
  word: string;
  translation: string;
  analysis: string;
  replica: number;
}


interface ReplicaType {
  id: number;
  interlocutor_a: string;
  interlocutor_b: string;
  translater_a: string;
  translater_b: string;
  interlocutor_a_analysis: WordAnalysis[];
  interlocutor_b_analysis: WordAnalysis[];
  interlocutor_a_audio: string; // URL для аудио файла A
  interlocutor_b_audio: string; // URL для аудио файла B
}


interface DialogueType {
  id: number;
  dialogue: string;
  replicas: ReplicaType[];
}


interface SuggestedAnswerType {
  id: number;
  option_text: string
  is_correct: boolean
}


interface ExerciseType {
  id: number;
  question: string;
  answer: string;
  suggested_answer: SuggestedAnswerType[];
}


interface SectionType {
  id: number;
  title: string;
  content?: string;
  dialogues: DialogueType[];
}


interface LessonDetailType {
  id: number;
  title: string;
  description: string;
  sections: SectionType[];
  exercises: ExerciseType[];
}


interface CommentType {
  id: number;
  text: string;
}

declare module 'react-speech-kit';
