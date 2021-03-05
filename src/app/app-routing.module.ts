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
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManabuAuthGuard } from 'src/guards/auth-guard';
import { ActiveCoursesComponent } from './admin/active-courses/active-courses.component';
import { ArchiveComponent } from './admin/archive-courses/archive-courses.component';
import { CourseAnalysisComponent } from './admin/course-analysis/course-analysis.component';
import { ManagePresentationsComponent } from './admin/manage-presentations/manage-presentations.component';
import { CourseSearchComponent } from './user/course-search/course-search.component';
import { UserHomeComponent } from './user/home/home.component';
import { UserCourseDetailsComponent } from './user/user-course-details/user-course-details.component';
import { AdminPersonalInfoComponent } from './admin/admin-personal-info/admin-personal-info.component';
import { UserPersonalInfoComponent } from './user/user-personal-info/user-personal-info.component';
import { SuperAdminComponent } from './super-admin/super-admin/super-admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin/home', pathMatch: 'full' },
  {
    path: 'admin/home',
    component: ActiveCoursesComponent,
    canActivate: [ManabuAuthGuard],
    data: {
      title: 'Admin Home'
    }
  },
  {
    path: 'admin/managePresentations',
    component: ManagePresentationsComponent,
    canActivate: [ManabuAuthGuard]
  },
  {
    path: 'admin/courseAnalysis',
    component: CourseAnalysisComponent,
    canActivate: [ManabuAuthGuard]
  },
  {
    path: 'admin/archive',
    component: ArchiveComponent,
    canActivate: [ManabuAuthGuard]
  },
  {
    path: 'admin/personalInfo',
    component: AdminPersonalInfoComponent,
    canActivate: [ManabuAuthGuard]
  },
  {
    path: 'superAdmin',
    component: SuperAdminComponent,
    canActivate: [ManabuAuthGuard]
  },
  {
    path: 'user/course',
    component: CourseSearchComponent,
    canActivate: [ManabuAuthGuard]
  },
  {
    path: 'user/courseDetails/:courseId',
    component: UserCourseDetailsComponent,
    canActivate: [ManabuAuthGuard]
  },
  {
    path: 'user/courseDetails/:courseId/:adminView',
    component: UserCourseDetailsComponent,
    canActivate: [ManabuAuthGuard]
  },
  {
    path: 'user/home',
    component: UserHomeComponent,
    canActivate: [ManabuAuthGuard]
  },
  {
    path: 'user/personalInfo',
    component: UserPersonalInfoComponent,
    canActivate: [ManabuAuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule],
  providers: [ManabuAuthGuard]
})
export class AppRoutingModule {}
