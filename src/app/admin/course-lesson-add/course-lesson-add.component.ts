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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import ClassicEditor from 'src/assets/build/ckeditor';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AppConfig } from 'src/app/app.config';
import { Lesson } from 'src/app/models/Lessons';
import IndicatorState from 'src/app/models/LoadingStates';
import { errorToasterOption, ToasterOptions } from 'src/app/models/toasterOptions';
import { CourseService } from 'src/app/services/course.service';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { LessonService } from 'src/app/services/lesson-service';
import Adapter from 'src/app/shared/adapter';
import { environment } from 'src/environments/environment';
import { Icon } from '../../models/Icon';
import { CourseLevel } from 'src/app/models/CourseLevels';

@Component({
  selector: 'course-lesson-add',
  templateUrl: './course-lesson-add.component.html',
  styleUrls: ['./course-lesson-add.component.scss']
})
export class CourseLessonAddComponent implements OnInit {
  public Editor = ClassicEditor;
  @Input() inModal = false;
  @Input() addCourseStep = true;
  @Input() courseId: string;
  @Input() currentLesson: Lesson;
  @Output() lessonCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() promptModalDismisal: EventEmitter<null> = new EventEmitter<null>();
  @Output() dismisModal: EventEmitter<null> = new EventEmitter<null>();
  @Output() courseContentHasBeenModified: EventEmitter<boolean> = new EventEmitter<boolean>();
  editorUploadUrl: string;
  videoDuration: number;
  lessonUploader: FileUploader;
  courseUploader: FileUploader;
  protected apiServer = AppConfig.settings.apiServer;
  courseTitle = '';
  courseDescription: string = '';
  courseAudience: string = '';
  coursePreRequisite: string = '';
  lessonTitle = '';
  courseLevel;
  embedNotHttp = false;
  courseActivate: number = 1;
  responsePassed: any;

  selectedImage: string = '';
  // trick to create the class variable and getting access to the enum's values from html
  IndicatorState = IndicatorState;
  loadingIndicator: IndicatorState;

  showCourseAdd = true;
  showSelectOptionsView = false;
  editorText = '';
  embedText = '';
  fileSelected = '';
  selectedLessonType;
  showNewAddVideo = false;
  showUpdateVideo = false;
  addCourseInformation = false;
  showEmbed = false;
  showNewAddText = false;
  showUpdateText = false;
  showAddCourseImage = false;
  showActivateCourse = false;
  fileUploadedMessage: string;
  fileName: string;
  previewPath: any;
  selectedLesson: any;

  Icons: Icon[];

  courseLevels = [];
  levelInterfaceObjects = CourseLevel;

  ckEditorConfig;
  public config = {
    placeholder: 'Course Description ....',
    toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote']
  };

  public configs = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'horizontalLine',
      '|',
      'indent',
      'outdent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'codeBlock',
      'undo',
      'redo'
    ]
  };

  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    this.lessonUploader = new FileUploader({
      url: this.apiServer.lesson.fileUploadPath,
      itemAlias: 'file',
      authToken: 'Bearer ' + KeycloakService.getToken()
    });

    this.lessonUploader.onBuildItemForm = (fileItem: any, form: any) => {
      this.loadingIndicator = IndicatorState.LOADING;
      form.append('title', this.lessonTitle);
      form.append('type', 'VIDEO');
      form.append('courseId', this.courseId);
      form.append('duration', this.videoDuration);
      form.append('fileExtension', fileItem.file.type.split('/').pop());
      if (this.currentLesson && this.currentLesson.title) {
        form.append('lessonId', this.currentLesson.id);
      }
    };

    this.lessonUploader.onErrorItem = (item) => this.onErrorItem(item);
    this.lessonUploader.onSuccessItem = (item) => {
      this.loadingIndicator = IndicatorState.LOADED;
      this.onSuccessItem(item);
    };

    this.courseUploader = new FileUploader({
      url: this.apiServer.lesson.courseFileUploadPath,
      itemAlias: 'file',
      authToken: 'Bearer ' + KeycloakService.getToken()
    });

    this.courseUploader.onBuildItemForm = (fileItem: any, form: any) => {
      this.loadingIndicator = IndicatorState.LOADING;
      form.append('title', this.lessonTitle);
      form.append('type', 'VIDEO');
      form.append('duration', this.videoDuration);
      form.append('image', this.selectedImage);
      form.append('courseTitle', this.courseTitle);
      form.append('courseImage', this.selectedImage);
      form.append('courseDescription', this.courseDescription);
      form.append('courseActivation', this.courseActivate);
      form.append('fileExtension', fileItem.file.type.split('/').pop());
      if (this.currentLesson && this.currentLesson.title) {
        form.append('lessonId', this.currentLesson.id);
      }
    };

    this.courseUploader.onErrorItem = (item) => this.onCourseErrorItem(item);
    this.courseUploader.onSuccessItem = (item) => {
      this.loadingIndicator = IndicatorState.LOADED;
      this.onSuccessItem(item);
    };
  }

  ngOnInit() {
    this.turnCourseLevelInterfaceIntoArray();
    this.editorUploadUrl = 'this.apiServer.lesson.fileUploadPath';
    this.fileUploadedMessage = null;
    this.showCourseAdd = this.addCourseStep ? true : false;
    this.showSelectOptionsView = this.addCourseStep ? false : true;
    this.afterFileAdd();
    if (this.currentLesson && this.currentLesson.title) {
      this.setCurrentLesson();
    }

    this.getIcons();
  }

  onCKEditorReady(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new Adapter(loader, editor.config);
    };
  }

  onMetadata(e, video) {
    this.videoDuration = Math.floor(video.duration);
  }

  setCurrentLesson() {
    this.lessonService.getLessonMarkdown(this.currentLesson.id).then((resp) => {
      this.selectedLesson = resp;
      this.selectedLessonType = this.currentLesson.type;
      this.lessonTitle = this.currentLesson.title;
      this.fileName = this.currentLesson.source;
      this.editorText = this.selectedLesson.lessons[0].markdown;
      this.embedText = this.currentLesson.markdown;
      this.courseId = this.currentLesson.course;

      this.goToLesson(this.selectedLessonType);
    });
  }

  afterFileAdd() {
    this.lessonUploader.onAfterAddingFile = (file) => {
      this.previewPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file._file));
      file.withCredentials = false;
    };

    this.courseUploader.onAfterAddingFile = (file) => {
      this.previewPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file._file));
      file.withCredentials = false;
    };
  }

  onFileSelected(file) {
    this.fileSelected = 'file';
    this.fileName = file.target.files[0].name;
    this.courseContentModified(true);
  }

  customAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new Adapter(loader, editor.config);
    };
  }

  onSuccessItem(item: FileItem): any {
    this.fileUploadedMessage = item.file.name + ' was uploaded successfully';
    setTimeout(() => {
      this.responsePassed = JSON.parse(item._xhr.response);
      this.lessonCreated.emit(this.responsePassed);
      this.toastr.success(this.fileUploadedMessage, null, ToasterOptions);
    }, 1000);
  }

  onCourseErrorItem(item: FileItem): any {
    this.fileUploadedMessage = 'There was an error uploading ' + item.file.name;
    if (JSON.parse(item._xhr.response).success === false) {
      setTimeout(() => {
        this.dismisModal.emit();
        this.toastr.success('Course title already exists', null, errorToasterOption);
      }, 1000);
    } else {
      setTimeout(() => {
        this.dismisModal.emit();
        this.toastr.success('There was an error uploading' + item.file.name, null, errorToasterOption);
      }, 1000);
    }
  }

  onErrorItem(item: FileItem): any {
    this.responsePassed = JSON.parse(item._xhr.response);
    this.lessonCreated.emit(this.responsePassed);
    this.fileUploadedMessage = 'There was an error uploading ' + item.file.name;
  }

  createCourseLesson() {
    this.lessonSelect();
  }

  courseCaptured() {
    this.pickCourseImage();
  }

  onCourseAdd() {}

  selectLessonType(value) {
    this.selectedLessonType = value;
  }

  pickCourseImage() {
    this.showCourseAdd = false;
    this.showAddCourseImage = true;
  }

  showAddCourseInformation() {
    this.showCourseAdd = false;
    this.addCourseInformation = true;
  }

  checkEmbedValidity() {
    if (!(this.embedText.indexOf('http') > -1)) {
      this.embedNotHttp = true;
    } else {
      this.embedNotHttp = false;
    }
  }

  courseContentModified(videoContentUploaded: boolean = false) {
    let contentAdded = false;
    let { courseTitle, courseDescription, lessonTitle, selectedImage, editorText, embedText } = this;
    let addedContent = [courseTitle, courseDescription, lessonTitle, selectedImage, editorText, embedText];
    addedContent.forEach((content) => {
      if (content !== '') {
        contentAdded = true;
      }
    });

    if (contentAdded || videoContentUploaded) {
      this.courseContentHasBeenModified.emit(true);
      return contentAdded;
    } else {
      this.courseContentHasBeenModified.emit(false);
      return contentAdded;
    }
  }

  dismiss() {
    let contentAdded = this.courseContentModified();

    if (contentAdded) {
      this.promptModalDismisal.emit();
    } else {
      this.dismisModal.emit();
    }
  }

  gotoStep1() {
    this.showCourseAdd = true;
    this.showSelectOptionsView = false;
    this.showNewAddText = false;
    this.showNewAddVideo = false;
    this.addCourseInformation = false;
  }

  lessonSelect() {
    this.showActivateCourse = false;
    this.showSelectOptionsView = true;
  }

  saveLesson(type: string) {
    if (!this.embedNotHttp) {
      let lesson: Lesson = {
        title: this.lessonTitle,
        type: type,
        course: this.courseId,
        markdown: this.editorText !== '' ? this.editorText : this.embedText,
        durationInSeconds: 0
      };

      if (this.currentLesson && this.currentLesson.title) {
        this.editLessonSave(lesson);
      } else {
        this.lessonService.addLesson(lesson).then((resp) => {
          this.lessonCreated.emit(resp);
        });
      }
    }
  }

  saveCourse() {
    this.courseService
      .addCourse(
        this.courseTitle,
        this.selectedImage,
        this.courseDescription,
        this.courseActivate,
        this.coursePreRequisite,
        this.courseAudience,
        this.courseLevel
      )
      .then((resp) => {
        this.toastr.success('Course created successfully', null, ToasterOptions);
        this.lessonCreated.emit();
      })
      .catch((e) => {
        if (!e.error.success) {
          this.toastr.success('Course title already exists', null, errorToasterOption);
          this.dismisModal.emit();
        } else {
          this.toastr.success(e.message, null, errorToasterOption);
          this.dismisModal.emit();
        }
      });
  }

  editLessonSave(lesson) {
    this.currentLesson.title = lesson.title;
    this.currentLesson.markdown = lesson.markdown;
    this.currentLesson.source = lesson.source;
    this.currentLesson.type = lesson.type;

    this.lessonService.editLesson(this.currentLesson).then(() => {
      this.lessonCreated.emit();
    });
  }

  setIconDataProperties() {
    this.Icons.forEach((Icon) => {
      if (!environment.production) {
        if (Icon.source.startsWith('/api/course_categories/')) {
          Icon.source = this.apiServer.urlRepo + Icon.source;
        }
      }
    });
  }

  iconSelect(iconSource: Icon['source'], $event) {
    this.selectedImage = iconSource;
    this.courseContentModified();
    let images = document.querySelectorAll('.selected-icon');
    images.forEach((image) => image.setAttribute('class', 'icon'));
    $event.currentTarget.setAttribute('class', 'selected-icon');
  }

  getIcons() {
    this.loadingIndicator = IndicatorState.LOADING;
    this.courseService
      .getIcons()
      .then((res) => {
        this.Icons = res;
        this.setIconDataProperties();
        this.loadingIndicator = IndicatorState.LOADED;
      })
      .catch(() => {
        this.loadingIndicator = IndicatorState.LOADED;
      });
  }

  leftScroll() {
    document.querySelector('.row-image-display').scrollBy(-100, 500);
  }

  rightScroll() {
    document.querySelector('.row-image-display').scrollBy(100, 500);
  }

  activateCourse(activate) {
    switch (activate) {
      case 0:
        this.courseActivate = 1;
        break;
      case 1:
        this.courseActivate = 0;
        break;
    }
  }

  goToLesson(type: string) {
    this.showSelectOptionsView = false;
    switch (type) {
      case 'TEXT':
        this.showUpdateText = true;
        this.showUpdateVideo = false;
        break;
      case 'VIDEO':
        this.showUpdateText = false;
        this.showUpdateVideo = true;
        break;
    }
  }

  goToType(type: string) {
    switch (type) {
      case 'TEXT':
        this.showNewAddText = true;
        this.showNewAddVideo = false;
        break;
      case 'VIDEO':
        this.showNewAddText = false;
        this.showNewAddVideo = true;
        break;
    }
  }

  turnCourseLevelInterfaceIntoArray() {
    for (let level in this.levelInterfaceObjects) {
      this.courseLevels.push(level);
    }
  }
}
