import { Lesson } from './Lessons';

export interface UserSidePanel {
    user?: UserInfo;
    numberOfCoursesStillInProgress?: string;
    numberOfCompletedCourses?: string;
    favourites?: number;
    isWatchingCourse?: boolean;
    favouriteCourses?: UserCourse[];
    courses?: UserCourse[];
    hasCompletedCourse?: boolean;
    completedCourses: UserCourse[];
  }
  
export interface UserInfo {
    image?: string;
    name?: string;
    surname?: string;
    email?: string;
}

export interface UserCourse {
    lessonProgress?: LessonProgress;
    id?: string;
    courseId?: string;
    status?: number;
    image?: string;
    title?: string;
    percentageCompleted?: string;
    lessons?: Lesson[];
    watched?: number;
    updatedAt?: string; 
}


export interface LessonProgress {
    completedCount?: number;
    started?: boolean;
}


  