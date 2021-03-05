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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { Course } from '../models/Course';
import { CourseLevel } from 'src/app/models/CourseLevels';

@Injectable()
export class CourseService {
  protected apiServer = AppConfig.settings.apiServer;

  constructor(private http: HttpClient) {}

  getAllCourses(): Promise<any> {
    let url = this.apiServer.course.getAllCourses;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  getCoursesbySearch(searchText: string) {
    let url = this.apiServer.course.getCoursesBySearch + searchText;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  getLatestCourse() {
    let url = this.apiServer.course.getLatestCourse;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  getCourseForContinuation() {
    let url = this.apiServer.course.getCourseForContinuation;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  getAdminCourses(): Promise<any> {
    let url = this.apiServer.course.getAdminCourses;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  getCoursesAnalysis(): Promise<any> {
    let url = this.apiServer.course.getCourseAnalysis;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  getArchivedCourses(): Promise<any> {
    let url = this.apiServer.course.getAdminArchivedCourses;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.get(url, options).toPromise<any>();
  }

  archiveCourse(courseId) {
    let url = this.apiServer.course.archiveCourse + courseId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.put<any>(url, options).toPromise<any>();
  }

  getCourse(id: string) {
    let url = this.apiServer.course.getCourse + id;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  addCourse(
    title: string,
    image: string,
    description: string,
    isPublished: number,
    coursePreRequisites: string,
    courseAudience: string,
    courseLevel: string
  ) {
    let url = this.apiServer.course.addCourse;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    const data = {
      title: title,
      image: image,
      description: description,
      isPublished: isPublished,
      coursePreRequisites: coursePreRequisites,
      courseAudience: courseAudience,
      courseLevel:
        courseLevel === undefined || courseLevel === 'undefined' ? (courseLevel = CourseLevel.All) : courseLevel
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  editCourse(course: Course) {
    let url = this.apiServer.course.editCourse + course.id;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    const data = {
      title: course.title,
      image: course.image,
      description: course.description,
      courseAudience: course.courseAudience,
      coursePreRequisites: course.coursePreRequisites,
      courseLevel: course.courseLevel
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  makeCourseActive(courseId) {
    let url = this.apiServer.course.makeCourseActive + courseId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.put<any>(url, options).toPromise<any>();
  }

  addTagtoCourse(courseId, tagName) {
    let url = this.apiServer.tags.addTag + courseId;
    let data = {
      tag: tagName
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  getIcons() {
    let url = this.apiServer.course.getCourseIcons;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }

  activateCourse(courseId) {
    let url = this.apiServer.course.activateCourse + courseId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.put<any>(url, options).toPromise<any>();
  }

  deactivateCourse(courseId) {
    let url = this.apiServer.course.deactivateCourse + courseId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.put<any>(url, options).toPromise<any>();
  }

  activateCourseReview(courseId) {
    let url = this.apiServer.course.activateCourseReview + courseId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.put<any>(url, options).toPromise<any>();
  }

  deactivateCourseReview(courseId) {
    let url = this.apiServer.course.deactivateCourseReview + courseId;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.put<any>(url, options).toPromise<any>();
  }

  addToFavourites(courseId: string) {
    let url = this.apiServer.course.updateCourseFavourite;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    const data = {
      courseId: courseId
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  removeCourseFromCompleted(courseId: string) {
    let url = this.apiServer.course.removeCourseFromWatched;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    const data = {
      courseId: courseId
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  rateCourse(course, userRating, userReview) {
    let url = this.apiServer.course.rateCourse + course.id;
    let data = {
      courseId: course.id,
      userRating: userRating,
      courseTitle: course.title,
      userComment: userReview
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  avarageRating(course) {
    let url = this.apiServer.course.avarageRating + course.id;
    let data = {
      courseId: course.id
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.put<any>(url, data, options).toPromise<any>();
  }
  courseCompletion(course) {
    let url = this.apiServer.course.courseCompletion + course.id;
    let data = {
      courseId: course.id
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };
    return this.http.post<any>(url, data, options).toPromise<any>();
  }

  getAllReviews(courseId): Promise<any> {
    let url = this.apiServer.course.getAllReviews + courseId;
    const options: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: {}
    };

    return this.http.get(url, options).toPromise<any>();
  }
}
