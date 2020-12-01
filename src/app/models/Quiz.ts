import { LessonTypes } from './LessonTypes';

export interface Quiz {
  questions?: TrueOrFalseQuiz | MultipleChoiceQuiz;
  questionType?: string;
  id?: string;
  title?: string;
  type?: LessonTypes;
  markdown?: string;
  source?: string;
  category?: string;
  durationInSeconds?: number;
  order?: number;
  createdAt?: any;
  updatedAt?: any;
  course?: string;
  lessonNumber?: number;
  answer?: string;
}

export interface TrueOrFalseQuiz {
  id?: string;
  question?: string;
  answer?: boolean;
  courseId?: string;
  lessonId?: string;
  createdAt?: any;
  updatedAt?: any;
  questionType?: string;
}

export interface MultipleChoiceQuiz {
  id?: string;
  question?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  answer?: string;
  courseId?: string;
  lessonId?: string;
  questionType?: string;
  createdAt?: any;
  updatedAt?: any;
  lessonNumber?: number;
}
