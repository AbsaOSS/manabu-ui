/*
 * Copyright 2020 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
