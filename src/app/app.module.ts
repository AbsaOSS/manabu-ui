import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { SimplemdeModule } from 'ngx-simplemde';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { ActiveCoursesComponent } from './admin/active-courses/active-courses.component';
import { AdminSidePanelComponent } from './admin/admin-side-panel/admin-side-panel/admin-side-panel.component';
import { ArchiveComponent } from './admin/archive-courses/archive-courses.component';
import { CourseAnalysisComponent } from './admin/course-analysis/course-analysis.component';
import { CourseLessonAddComponent } from './admin/course-lesson-add/course-lesson-add.component';
import { CourseDetailComponent } from './admin/course-list/course-detail/course-detail.component';
import { CoursesComponent } from './admin/course-list/course-list.component';
import { CourseStatsComponent } from './admin/course-analysis/course-stats/course-stats.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { ManagePresentationsComponent } from './admin/manage-presentations/manage-presentations.component';
import { MenuComponent } from './admin/menu/menu.component';
import { AddContributorComponent } from './admin/modals/add-contributor/add-contributor.component';
import { AddQuizComponent } from './admin/modals/add-quiz/add-quiz.component';
import { AddTagsComponent } from './admin/modals/add-tags/add-tags.component';
import { ConfirmCourseActivationComponent } from './admin/modals/confirm-course-activation/confirm-course-activation.component';
import { ConfirmCourseAddComponent } from './admin/modals/confirm-course-add/confirm-course-add.component';
import { ConfirmCourseDeactivationComponent } from './admin/modals/confirm-course-deactivation/confirm-course-deactivation.component';
import { ConfirmCourseDeleteComponent } from './admin/modals/confirm-course-delete/confirm-course-delete.component';
import { CourseStatisticsComponent } from './admin/modals/course-statistics/course-statistics.component';
import { CreateCourseLessonComponent } from './admin/modals/create-course-lesson/create-course-lesson.component';
import { DeleteLessonComponent } from './admin/modals/delete-lesson/delete-lesson.component';
import { ConfirmTagRemovalComponent } from './admin/modals/confirm-tag-removal/confirm-tag-removal.component';
import { DownloadComponent } from './admin/modals/download/download.component';
import { EditCourseComponent } from './admin/modals/edit-course/edit-course.component';
import { PreviewComponent } from './admin/modals/preview/preview.component';
import { UploadComponent } from './admin/modals/upload/upload.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { OembedPipe } from './pipes/oembed.pipe';
import { SingleDigitHandlerPipe } from './pipes/single-digit-handler.pipe';
import { AdminService } from './services/admin.service';
import { BookMarkService } from './services/bookmark.service';
import { ContributorService } from './services/contributor.service';
import { CourseHelperService } from './services/course-helper.service';
import { CourseService } from './services/course.service';
import { KeycloakTokenInterceptor } from './services/keycloak.http.interceptor';
import { KeycloakService } from './services/keycloak.service';
import { LessonService } from './services/lesson-service';
import { Quizservice } from './services/quiz-service';
import { TagsService } from './services/tags.service';
import { StatisticsService } from './services/statistics.service';
import { UserService } from './services/user.service';
import { HeaderComponent } from './shared/header/header.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { SidePanelComponent } from './shared/side-panel/side-panel.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { CourseSearchComponent } from './user/course-search/course-search.component';
import { UserHomeComponent } from './user/home/home.component';
import { LessonDetailsComponent } from './user/lesson-details/lesson-details.component';
import { ConfirmCourseRemovalFromCompletedComponent } from './user/modals/confirm-course-removal-from-completed/confirm-course-removal-from-completed.component';
import { QuizDetailsComponent } from './user/quiz-details/quiz-details.component';
import { StepperComponent } from './user/stepper/stepper.component';
import { UserCourseDetailsComponent } from './user/user-course-details/user-course-details.component';
import { UserCoursesComponent } from './user/user-courses/user-courses.component';
import { UserSidePanelComponent } from './user/user-side-panel/user-side-panel/user-side-panel.component';
import { CourseListAnalysisComponent } from './admin/course-analysis/course-list-Analysis/course-list-analysis.component';
import { RateCourseComponent } from './user/rate-course/rate-course.component';
import { RateCourse } from './user/modals/rate-course/rate-course.component';
import { OrderLessonCompletedComponent } from './admin/modals/move-lesson/order-lesson.component';
import { ConfirmDismissalOfCourseCreationModalComponent } from './admin/modals/confirm-dismissal-of-course-creation-modal/confirm-dismissal-of-course-creation-modal.component';
import { AdminPersonalInfoComponent } from './admin/admin-personal-info/admin-personal-info.component';
import { UserPersonalInfoComponent } from './user/user-personal-info/user-personal-info.component';
import { PersonalInfoWelcomeComponent } from './shared/personal-info-welcome/personal-info-welcome.component';
import { UserImageUploadingModalComponent } from './shared/user-image-uploading-modal/user-image-uploading-modal.component';
import { SuperAdminComponent } from './super-admin/super-admin/super-admin.component';
import { SuperAdminService } from './services/superAdmin.service';
import { ContributionRequestService } from './services/contributionRequest.service';
import { NotificationsComponent } from 'src/app/shared/notifications/notifications.component';
import { NotificationService } from 'src/app/services/notifications.service';
import { BriefCourseOverviewComponent } from './admin/modals/brief-course-overview/brief-course-overview.component';
import { ReviewsComponent } from './user/modals/reviews/reviews.component';
import { SuperAdminCourseStatisticsViewComponent } from 'src/app/super-admin/modals/super-admin-course-statistics-view/super-admin-course-statistics-view.component';
import { CourseReviewsComponent } from 'src/app/super-admin/modals/course-reviews/course-reviews.component';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    AdminHomeComponent,
    HeaderComponent,
    UserHomeComponent,
    WelcomeComponent,
    SidePanelComponent,
    MenuComponent,
    ManagePresentationsComponent,
    CourseAnalysisComponent,
    SingleDigitHandlerPipe,
    OembedPipe,
    CourseDetailComponent,
    DownloadComponent,
    AddTagsComponent,
    OrderLessonCompletedComponent,
    UploadComponent,
    PreviewComponent,
    RateCourse,
    AddContributorComponent,
    AddQuizComponent,
    CreateCourseLessonComponent,
    ConfirmCourseDeleteComponent,
    ArchiveComponent,
    ConfirmCourseAddComponent,
    CourseLessonAddComponent,
    DeleteLessonComponent,
    ActiveCoursesComponent,
    UserCoursesComponent,
    StepperComponent,
    UserCourseDetailsComponent,
    CourseSearchComponent,
    LessonDetailsComponent,
    QuizDetailsComponent,
    EditCourseComponent,
    ConfirmCourseActivationComponent,
    ConfirmCourseDeactivationComponent,
    AdminSidePanelComponent,
    UserSidePanelComponent,
    ConfirmCourseRemovalFromCompletedComponent,
    CourseStatsComponent,
    LoaderComponent,
    CourseStatisticsComponent,
    ConfirmTagRemovalComponent,
    CourseListAnalysisComponent,
    RateCourseComponent,
    ConfirmTagRemovalComponent,
    ConfirmDismissalOfCourseCreationModalComponent,
    AdminPersonalInfoComponent,
    UserPersonalInfoComponent,
    PersonalInfoWelcomeComponent,
    UserImageUploadingModalComponent,
    SuperAdminComponent,
    NotificationsComponent,
    BriefCourseOverviewComponent,
    ReviewsComponent,
    SuperAdminCourseStatisticsViewComponent,
    CourseReviewsComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    DragDropModule,
    ToastrModule.forRoot(),
    CKEditorModule,
    SimplemdeModule.forRoot({}),
    ChartsModule
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakTokenInterceptor,
      multi: true
    },
    NotificationService,
    ContributionRequestService,
    SuperAdminService,
    CourseService,
    UserService,
    AdminService,
    CourseHelperService,
    LessonService,
    Quizservice,
    ContributorService,
    BookMarkService,
    StatisticsService,
    KeycloakService,
    TagsService
  ],
  entryComponents: [
    CourseReviewsComponent,
    SuperAdminCourseStatisticsViewComponent,
    BriefCourseOverviewComponent,
    NotificationsComponent,
    UserImageUploadingModalComponent,
    ConfirmDismissalOfCourseCreationModalComponent,
    ConfirmCourseRemovalFromCompletedComponent,
    EditCourseComponent,
    ConfirmCourseDeactivationComponent,
    ConfirmCourseActivationComponent,
    DownloadComponent,
    AddTagsComponent,
    OrderLessonCompletedComponent,
    UploadComponent,
    PreviewComponent,
    RateCourseComponent,
    AddContributorComponent,
    AddQuizComponent,
    CreateCourseLessonComponent,
    ConfirmCourseDeleteComponent,
    ConfirmCourseAddComponent,
    DeleteLessonComponent,
    CourseStatisticsComponent,
    ConfirmTagRemovalComponent,
    RateCourse,
    ReviewsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
