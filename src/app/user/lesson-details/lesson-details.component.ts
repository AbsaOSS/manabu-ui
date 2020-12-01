import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Course } from 'src/app/models/Course';
import { Lesson } from 'src/app/models/Lessons';
import { LessonTypes } from 'src/app/models/LessonTypes';
import { CourseHelperService } from 'src/app/services/course-helper.service';
import { BookMarkService } from 'src/app/services/bookmark.service';
import { ToasterOptions, errorToasterOption } from 'src/app/models/toasterOptions';
import { ToastrService } from 'ngx-toastr';
import { LessonService } from 'src/app/services/lesson-service';
import { OembedPipe } from 'src/app/pipes/oembed.pipe';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RateCourse } from '../modals/rate-course/rate-course.component';
import { RateCourseComponent } from '../rate-course/rate-course.component';
import { CourseService } from 'src/app/services/course.service';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss'],
  providers: [OembedPipe]
})
export class LessonDetailsComponent implements OnInit, OnDestroy {
  @Input() lesson: Lesson;
  @Input() course: Course;
  @Input() isSideStepperHidden: boolean;
  @Input() lessonNumber: number;
  @Input() tags;
  @Input() isLastLesson: boolean = false;
  @Input() lessonBookMarks = [];
  @Input() startTime = 0;
  @Input() lessonHasQuiz;
  @Input() totalLessons;
  @Input() currentLessonNumber;
  @Input() completedLessons: number;
  @Output() nextClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() hideStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() lessonCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() previousClicked: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('videoContent', { static: false }) video: any;
  embedUrl: SafeResourceUrl;
  embeddedHTML: SafeResourceUrl = '';
  lessonType: string;
  lessonUpdateJob: any;
  isAdmin = false;
  adminIsViewingAsAdmin: string;
  courseIsComplete = false;

  constructor(
    private courseHelperService: CourseHelperService,
    private bookmarkService: BookMarkService,
    private toastr: ToastrService,
    private lessonService: LessonService,
    private sanitizer: DomSanitizer,
    private htmlEmbedHandler: OembedPipe,
    private modalService: NgbModal,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.setUsersView();
  }

  setUsersView() {
    let userRole: any = KeycloakService.getUserAccessPermissions();

    if (userRole === Role.Admin) {
      this.adminIsViewingAsAdmin = localStorage.getItem('adminView');
      this.isAdmin = true;
    }
    this.checkLessonType(this.lesson, this.isAdmin);
    this.courseHelperService.loadLesson$.subscribe((lesson) => {
      this.checkLessonType(lesson, this.isAdmin);
    });
  }

  checkLessonType(lesson: Lesson, isAdmin: boolean) {
    this.lessonType = lesson.type;
    this.lessonType === LessonTypes.Embed ? this.handleEmbedLessons(lesson) : '';
    this.lessonType === LessonTypes.Text && lesson.markdown.indexOf('oembed') > 0
      ? this.handleEmbedTextLessons(lesson)
      : (this.embeddedHTML = '');
    this.lessonType === LessonTypes.Video ? this.handleVideoLessons(lesson) : '';
    this.lessonType !== LessonTypes.Video ? this.handleNonVideoLessons(lesson) : '';
  }

  handleEmbedLessons(lesson) {
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(lesson.markdown + '/');
  }

  handleEmbedTextLessons(lesson) {
    this.embeddedHTML = this.sanitizer.bypassSecurityTrustHtml(this.htmlEmbedHandler.transform(lesson.markdown));
  }

  handleVideoLessons(lesson) {
    if (this.video !== undefined && this.video !== null) {
      this.video.nativeElement.src = lesson.source;
    }
    if (!this.isAdmin || this.adminIsViewingAsAdmin === 'false') {
      this.recordProgress();
    }
  }

  handleNonVideoLessons(lesson) {
    //mark that the lesson was accessed
    if (this.isLastLesson) {
      if (!this.isAdmin || this.adminIsViewingAsAdmin === 'false') {
        this.markLessonCompleted();
      } else {
        if (!this.isAdmin || this.adminIsViewingAsAdmin === 'false') {
          this.lessonService.recordProgress(this.lesson.course, lesson.id, 1);
        }
      }
    }
    this.clearCheck();
  }

  loadVideoMetaData(e, video) {
    if (this.startTime > 0) {
      video.nativeElement.currentTime = this.startTime;
    }
  }

  recordProgress() {
    this.lessonUpdateJob = setInterval(() => {
      if (this.lesson.durationInSeconds > 0) {
        let progress = this.video.nativeElement.currentTime / this.lesson.durationInSeconds;
        if (progress !== null) {
          if (progress >= 0.95) {
            this.markLessonCompleted();
          }
          this.lessonService.recordProgress(this.lesson.course, this.lesson.id, progress);
        }
      }
    }, 1000);
  }

  async markLessonCompleted() {
    if (this.completedLessons + 1 >= this.totalLessons && this.isLastLesson) {
      this.lessonService.markLessonCompleted(this.lesson.id, this.course.id).then((resp) => {
        this.courseIsComplete = true;
        this.lessonCompleted.emit();
        this.clearCheck();
      });
    } else {
      this.lessonService.markLessonCompleted(this.lesson.id, this.course.id).then((resp) => {
        this.clearCheck();
      });
    }
  }

  completeCourse() {
    this.courseService
      .courseCompletion(this.course)
      .then((resp) => {
        this.rateCourse(this.course);
      })
      .catch((e) => {});
    this.clearCheck();
  }

  checkNextLesson() {
    if (this.lessonType !== LessonTypes.Video) {
      if (!this.isAdmin || this.adminIsViewingAsAdmin === 'false') {
        this.markLessonCompleted();
      }
    }

    this.clearCheck();
    if (!this.isLastLesson || this.lessonHasQuiz) {
      this.nextClicked.emit(this.lessonNumber);
    }
  }

  loadPreviousLesson() {
    this.clearCheck();
    this.previousClicked.emit(this.lessonNumber);
  }

  bookmarkPosition() {
    this.bookmarkService.bookMarkLesson(this.video.nativeElement.currentTime, this.course.id, this.lesson.id);
    this.toastr.success('Bookmark added', null, ToasterOptions);
  }

  clearCheck() {
    if (this.lessonUpdateJob) {
      clearInterval(this.lessonUpdateJob);
      this.lesson.durationInSeconds = 0;
    }
  }
  rateCourse(course) {
    const addRatingModalref = this.modalService.open(RateCourse, {
      windowClass: 'contributor-modal'
    });
    addRatingModalref.componentInstance.course = course;
  }
  rateCourses(course) {
    const addRatingModalref = this.modalService.open(RateCourseComponent, {
      windowClass: 'contributor-modal'
    });
    addRatingModalref.componentInstance.course = course;
  }

  activateHideStepper() {
    this.hideStepper.emit();
  }

  ngOnDestroy() {
    this.clearCheck();
  }
}
