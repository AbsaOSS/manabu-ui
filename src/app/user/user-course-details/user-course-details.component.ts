import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { Course } from 'src/app/models/Course';
import { Quiz } from 'src/app/models/Quiz';
import { QuizItem } from 'src/app/models/QuizItem';
import { Step, SubStep, StepStatus } from 'src/app/models/Step';
import { CourseHelperService } from 'src/app/services/course-helper.service';
import { CourseService } from 'src/app/services/course.service';
import { environment } from 'src/environments/environment';
import { AdminService } from 'src/app/services/admin.service';
import { LessonService } from 'src/app/services/lesson-service';
import IndicatorState from 'src/app/models/LoadingStates';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-user-course-details',
  templateUrl: './user-course-details.component.html',
  styleUrls: ['./user-course-details.component.scss']
})
export class UserCourseDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('verticalStepper', { static: false }) stepper: any;
  protected apiServer = AppConfig.settings.apiServer;
  course: Course;
  questions: any[];
  authors: any[];
  lessons: any;
  videoStartTime = 0;
  lessonsInProgress: any;
  quizzes: Quiz[] = [];
  currentStep: number = 0;
  quizMarker: QuizItem;
  currentQuiz: any;
  currentLesson: any;
  steps: Step[];
  isLastStep = false;
  isLastSection = false;
  isFirstSection = false;
  showIntro = false;
  tags = [];
  lessonBookMarks = [];
  isAdminViewing: boolean;
  adminIsViewingAsAdmin: string;
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;
  numberOfQuizes: number;
  currentQuizIndex: number = 0;
  hideNext: boolean = false;
  isLastLesson: boolean = false;
  courseId: string;
  lessonId: string;
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  completedCourse: boolean = false;
  lessonHasQuizzes: boolean;
  lessonIsComplete: boolean = false;
  currentLessonNumber: number;
  coursesByAuthor = [];
  scrollButton;
  courseDuration: any;
  isSideStepperHidden: boolean = false;

  constructor(
    private courseHelperService: CourseHelperService,
    private adminService: AdminService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private lessonService: LessonService
  ) {}

  ngOnInit() {
    window.addEventListener('scroll', this.scrollFunction, true);
    let courseId = this.activatedRoute.snapshot.params['courseId'];
    this.isAdminViewing = this.activatedRoute.snapshot.params['adminView'];
    this.setUsersView();
    if (this.isAdminViewing && this.adminIsViewingAsAdmin === 'true') {
      this.adminService.setAdminHeader(false);
    }
    this.scrollTop();
    this.loadingIndicator = IndicatorState.LOADING;
    this.isSideStepperHidden = false;
    this.courseService
      .getCourse(courseId)
      .then((resp) => {
        if (resp.showIntro) {
          this.showIntro = resp.showIntro;
          this.course = resp.course;
          this.tags = resp.tags;
          this.currentLesson = resp.currentLesson;
          this.lessons = this.course.lessons;
          this.coursesByAuthor = resp.coursesByAuthor;
          this.courseDuration = resp.courseDuration;
          this.resetImages();
        } else {
          this.showIntro = resp.showIntro;
          this.isLastStep = resp.isLastLesson;
          this.course = resp.course;
          this.currentLesson = resp.currentLesson;
          this.lessons = resp.courseLessons;
          this.currentLessonNumber = resp.currentLessonNumber;
          this.questions = this.extractQuizes();
          this.tags = resp.tags;
          this.lessonsInProgress = resp.lessonsProgress;
          this.totalLessons = resp.courseLessons.length;
          this.completedLessons = resp.completedLessons;
          this.lessonHasQuizzes = this.lessonHasQuiz();
          this.setupSteps();
          if (this.currentLesson.type === 'VIDEO') {
            this.videoStartTime = this.currentLesson.videoStartTime;
            this.lessonBookMarks = this.removeDuplicateBookMarks(resp.currentLesson.bookMarks);
          }
        }
        if (this.lessonHasQuiz()) {
          this.setupQuizzes();
          this.quizMarker = { lesson: this.currentLesson.id, section: 0 };
          if (this.isLastStep) {
            this.isLastStep = false;
            this.isLastLesson = true;
          }
        }
        this.resetImages();
        this.courseHelperService.onLessonLoaded(this.currentLesson);
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => (this.loadingIndicator = IndicatorState.LOADED));
  }

  setUsersView() {
    let userRole: any = KeycloakService.getUserAccessPermissions();

    if (userRole === Role.Admin) {
      this.adminIsViewingAsAdmin = localStorage.getItem('adminView');
      this.isAdminViewing = true;
    }
  }

  startCourse(courseId: string) {
    this.activateSpinner();
    this.loadingIndicator = IndicatorState.LOADING;
    this.lessonService
      .initiateCourse(courseId)
      .then((resp) => {
        this.showIntro = false;
        this.isLastStep = resp.isLastLesson;
        this.course = resp.course;
        this.currentLesson = resp.currentLesson;
        this.lessons = resp.courseLessons;
        this.currentLessonNumber = resp.currentLessonNumber;
        this.questions = this.extractQuizes();
        this.lessonsInProgress = resp.lessonsProgress;
        this.totalLessons = resp.courseLessons.length;
        this.completedLessons = resp.completedLessons;
        this.lessonHasQuizzes = this.lessonHasQuiz();
        this.setupSteps();
        if (this.currentLesson.type === 'VIDEO') {
          this.videoStartTime = this.currentLesson.videoStartTime;
          this.lessonBookMarks = this.removeDuplicateBookMarks(resp.currentLesson.bookMarks);
        }
        if (this.lessonHasQuiz()) {
          this.setupQuizzes();
          this.quizMarker = { lesson: this.currentLesson.id, section: 0 };
          if (this.isLastStep) {
            this.isLastStep = false;
            this.isLastLesson = true;
          }
        }
        this.resetImages();
        this.courseHelperService.onLessonLoaded(this.currentLesson);
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => (this.loadingIndicator = IndicatorState.LOADED));
  }

  scrollFunction() {
    this.scrollButton = document.getElementsByClassName('scroll-button');
    if (document.querySelector('.lesson-detail-section').scrollTop > 450) {
      this.scrollButton[0].style.display = 'block';
    } else {
      this.scrollButton[0].style.display = 'none';
    }
  }

  scrollTop() {
    document.querySelector('.lesson-detail-section').scrollTo({ top: 0, behavior: 'smooth' });
  }

  hideStepper() {
    this.isSideStepperHidden === true ? (this.isSideStepperHidden = false) : (this.isSideStepperHidden = true);
  }

  getNextLesson() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.lessonService
      .loadNextLesson(this.courseId, this.lessonId)
      .then((resp) => {
        if (!this.isAdminViewing || this.adminIsViewingAsAdmin === 'false') {
          this.showIntro = resp.showIntro;
        }
        this.course = resp.course;
        this.isLastStep = resp.isLastLesson;
        this.currentLesson = resp.currentLesson;
        this.lessons = resp.courseLessons;
        this.currentLessonNumber = resp.currentLessonNumber;
        this.questions = this.extractQuizes();
        this.lessonsInProgress = resp.lessonsProgress;
        this.totalLessons = resp.courseLessons.length;
        this.completedLessons = resp.completedLessons;
        this.lessonHasQuizzes = this.lessonHasQuiz();
        this.setupSteps();
        if (this.currentLesson.type === 'VIDEO') {
          this.videoStartTime = this.currentLesson.videoStartTime;
          this.lessonBookMarks = this.removeDuplicateBookMarks(resp.currentLesson.bookMarks);
        }
        if (this.lessonHasQuiz()) {
          this.setupQuizzes();
          this.quizMarker = { lesson: this.currentLesson.id, section: 0 };
          if (this.isLastStep) {
            this.isLastStep = false;
            this.isLastLesson = true;
          }
        }
        this.resetImages();
        this.courseHelperService.onLessonLoaded(this.currentLesson);
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => (this.loadingIndicator = IndicatorState.LOADED));
  }

  getPreviousLesson() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.lessonService
      .loadPreviousLesson(this.courseId, this.lessonId)
      .then((resp) => {
        if (!this.isAdminViewing || this.adminIsViewingAsAdmin === 'false') {
          this.showIntro = resp.showIntro;
        }
        this.courseDuration = resp.courseDuration;
        this.isLastStep = resp.isLastLesson;
        this.course = resp.course;
        this.currentLesson = resp.currentLesson;
        this.lessons = resp.courseLessons;
        this.currentLessonNumber = resp.currentLessonNumber;
        this.coursesByAuthor = resp.coursesByAuthor;
        this.questions = this.extractQuizes();
        this.lessonsInProgress = resp.lessonsProgress;
        this.totalLessons = resp.courseLessons.length;
        this.completedLessons = resp.completedLessons;
        if (!this.showIntro) {
          this.setupSteps();
        }
        if (this.currentLesson.type === 'VIDEO') {
          this.videoStartTime = this.currentLesson.videoStartTime;
          this.lessonBookMarks = this.removeDuplicateBookMarks(resp.currentLesson.bookMarks);
        }
        if (this.lessonHasQuiz()) {
          this.setupQuizzes();
          this.quizMarker = { lesson: this.currentLesson.id, section: 0 };
        }
        this.resetImages();
        this.courseHelperService.onLessonLoaded(this.currentLesson);
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => (this.loadingIndicator = IndicatorState.LOADED));
  }

  stepClicked(lessonId: string) {
    this.activateSpinner();
    this.loadingIndicator = IndicatorState.LOADING;
    this.lessonService
      .getLesson(this.courseId, lessonId)
      .then((resp) => {
        this.hideNext = false;
        this.isLastLesson = false;
        this.currentQuizIndex = 0;
        this.isLastStep = resp.isLastLesson;
        this.course = resp.course;
        this.currentLesson = resp.currentLesson;
        this.lessons = resp.courseLessons;
        this.currentLessonNumber = resp.currentLessonNumber;
        this.questions = this.extractQuizes();
        this.lessonsInProgress = resp.lessonsProgress;
        this.totalLessons = resp.courseLessons.length;
        this.completedLessons = resp.completedLessons;
        this.lessonHasQuizzes = this.lessonHasQuiz();
        this.setupSteps();
        if (this.currentLesson.type === 'VIDEO') {
          this.videoStartTime = this.currentLesson.videoStartTime;
          this.lessonBookMarks = this.removeDuplicateBookMarks(resp.currentLesson.bookMarks);
        }
        if (this.lessonHasQuiz()) {
          this.setupQuizzes();
          this.quizMarker = { lesson: this.currentLesson.id, section: 0 };
          if (this.isLastStep) {
            this.isLastStep = false;
            this.isLastLesson = true;
          }
        }
        this.resetImages();
        this.courseHelperService.onLessonLoaded(this.currentLesson);
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => (this.loadingIndicator = IndicatorState.LOADED));
  }

  loadNextLesson() {
    if (this.lessonHasQuiz()) {
      if (this.currentQuizIndex === this.totalQuizzes) {
        this.currentQuizIndex = 0;
        this.activateSpinner();
        this.getNextLesson();
      } else {
        this.quizMarker = { lesson: this.currentLesson.id, section: 0 };
        this.setupQuizzes();
        this.loadQuiz(this.quizMarker);
        this.currentQuizIndex++;
        if (this.currentQuizIndex === this.totalQuizzes && this.isLastStep) {
          if (this.totalLessons === this.completedLessons || this.lessonIsComplete) {
            this.completedCourse = true;
          } else {
            this.hideNext = true;
          }
        }
      }
    } else {
      this.activateSpinner();
      this.getNextLesson();
    }
  }

  loadPreviousLesson() {
    this.hideNext = false;
    this.currentQuiz = undefined;
    this.isLastLesson = false;
    if (this.lessonHasQuiz()) {
      if (this.currentQuizIndex === 0) {
        this.activateSpinner();
        this.getPreviousLesson();
      } else {
        this.quizMarker = { lesson: this.currentLesson.id, section: 0 };
        this.currentQuizIndex--;
        this.loadQuiz(this.quizMarker);
      }
    } else {
      this.activateSpinner();
      this.getPreviousLesson();
    }
  }

  activateLessonWithQuizCompletion() {
    this.lessonIsComplete = true;
  }

  removeDuplicateBookMarks(bookmarks) {
    const updatedList = [];
    bookmarks.map((x) =>
      updatedList.filter((a) => a.duration === x.duration).length > 0 ? null : updatedList.push(x)
    );
    return updatedList;
  }

  resetImages() {
    this.course.authors.forEach((author) => {
      author.initials = `${author.name[0].toUpperCase()}${author.surname[0].toUpperCase()}`;
    });

    if (!environment.production) {
      if (this.course.image.startsWith('/api/uploads/') || this.course.image.startsWith('uploads/')) {
        this.course.image = this.apiServer.urlRepo + this.course.image;
      }

      if (this.currentLesson.source.startsWith('/api/uploads/') || this.currentLesson.source.startsWith('uploads/')) {
        this.currentLesson.source = this.apiServer.urlRepo + this.currentLesson.source;
      }
    }

    this.course.coursePreRequisites = this.course.coursePreRequisites.replace(/(<([^>]+)>)/gi, '');
    this.course.courseAudience = this.course.courseAudience.replace(/(<([^>]+)>)/gi, '');

    this.coursesByAuthor.forEach((course) => {
      if (course.image.startsWith('/api/uploads/') || course.image.source.startsWith('uploads/')) {
        course.image = this.apiServer.urlRepo + course.image;
      }
    });
  }

  setupSteps() {
    this.steps = this.lessons.map((lesson, index) => {
      let status;
      let lessonKey =
        this.lessonsInProgress
          .filter((activeLesson) => activeLesson.id === lesson.id)
          .map((activeLesson) => activeLesson.progress).length > 0
          ? this.lessonsInProgress
              .filter((activeLesson) => activeLesson.id === lesson.id)
              .map((activeLesson) => activeLesson.progress)[0]
          : 0;
      if (lessonKey === 0) {
        status = StepStatus.Unwatched;
      } else if (lessonKey < 1) {
        status = StepStatus.Watching;
      } else if (lessonKey === 1) {
        status = StepStatus.Completed;
      }
      return {
        step: lesson.id,
        label: lesson.title,
        status: lesson.id === this.currentLesson.id ? StepStatus.Current : status
      };
    });
  }

  lessonHasQuiz(): boolean {
    return this.questions[0].length > 0 || this.questions[1].length > 0;
  }

  extractQuizes() {
    return Object.keys(this.currentLesson)
      .filter((key) => key === 'trueOrFalseQuestions' || key === 'multipleChoiceQuestions')
      .map((key) => this.currentLesson[key]);
  }

  setupQuizzes() {
    this.quizzes = [];
    this.stepper.sections = [];

    let questions = [...this.questions[0], ...this.questions[1]];
    this.totalQuizzes = questions.length;

    questions.forEach((quiz, index) => {
      let section: SubStep = {
        id: this.currentLesson.id,
        label: 'Quiz'
      };
      quiz.lessonNumber = this.currentLesson.id;
      this.stepper.sections.push(section);
      this.quizzes.push(quiz);
    });
  }

  loadQuiz(quizItem: QuizItem) {
    this.currentQuiz = this.quizzes[this.currentQuizIndex];
    this.courseHelperService.onQuizLoaded(this.currentQuiz);
    this.stepper.setCurrentSection(quizItem.lesson + '_' + quizItem.section);
  }

  sectionClicked(quizItem: QuizItem) {
    this.loadQuiz(quizItem);
  }

  activateSpinner() {
    this.scrollTop();
    this.courseId = this.course.id;
    this.lessonId = this.currentLesson.id;
    this.currentLesson = undefined;
    this.course = undefined;
    this.steps = undefined;
    this.currentQuiz = undefined;
    this.showIntro = false;
    this.lessonHasQuizzes = false;
  }

  ngOnDestroy() {
    if (this.isAdminViewing && this.adminIsViewingAsAdmin === 'true') {
      this.adminService.setAdminHeader(true);
    }
  }
}
