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
