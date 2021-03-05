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
export interface IAppConfig {
  env: {
    name: string;
  };
  apiServer: {
    root: string;
    urlRepo: string;
    course: {
      getAllCourses: string;
      getAdminCourses: string;
      getAdminArchivedCourses: string;
      getCourse: string;
      archiveCourse: string;
      makeCourseActive: string;
      addCourse: string;
      editCourse: string;
      rateCourse: string;
      avarageRating: string;
      getCoursesBySearch: string;
      getLatestCourse: string;
      getCourseForContinuation: string;
      getCourseIcons: string;
      activateCourse: string;
      deactivateCourse: string;
      updateCourseFavourite: string;
      courseCompletion: string;
      removeCourseFromWatched: string;
      getCourseAnalysis: string;
      getAllReviews: string;
      activateCourseReview: string;
      deactivateCourseReview: string;
    };
    quiz: {
      postTrueOrFalse: string;
      postMultipleChoice: string;
    };
    contributor: {
      addContributor: string;
      deleteContributor: string;
    };
    tags: {
      addTag: string;
      removeTag: string;
    };
    lesson: {
      addLesson: string;
      editLesson: string;
      deleteLesson: string;
      fileUploadPath: string;
      orderLesson: string;
      recordLessonProgress: string;
      markLessonCompleted: string;
      courseFileUploadPath: string;
      getCourseLessons: string;
      initiateCourse: string;
      loadNextLesson: string;
      loadPreviousLesson: string;
      getLesson: string;
      getLessonMarkdown: string;
    };
    bookmark: {
      bookmarkLesson: string;
      getLessonBookmarks: string;
    };
    admin: {
      getAdminProfile: string;
      getAdminSidePanelContent: string;
      adminPersonalInfo: string;
      getAllUsers: string;
    };
    statistics: {
      getCourseStatistics: string;
      userCourseStats: string;
    };
    user: {
      getUserInfo: string;
      userPersonalInfo: string;
      updateUserPersonalInfo: string;
      updateUserPersonalImage: string;
      requestAdminPrivillege: string;
    };
    superAdmin: {
      userAdminRequestPermissionApproval: string;
      getSuperAdminViewData: string;
      approveAuthorContributionRequest: string;
    };
    courseContributionRequests: {
      addContributor: string;
      acceptContributionRequest: string;
      rejectContributionRequest: string;
      deleteContributionRequestStatus: string;
    };
    notifications: {
      getContributionRequsts: string;
      markContributionRequestAsRead: string;
      contributionRequestStatus: string;
      notifications: string;
    };
  };
}
