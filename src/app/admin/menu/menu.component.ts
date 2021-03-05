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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCourseLessonComponent } from '../modals/create-course-lesson/create-course-lesson.component';
import { ToasterOptions } from 'src/app/models/toasterOptions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items = [
    {
      name: 'Manage my courses',
      active: true,
      path: 'admin/home'
    },
    {
      name: 'Manage My Presentations',
      active: false,
      path: 'admin/managePresentations'
    },
    {
      name: 'Course Analysis',
      active: false,
      path: 'admin/courseAnalysis'
    },
    {
      name: 'Add a New Course',
      active: false,
      isModal: true,
      component: CreateCourseLessonComponent,
      modalPath: 'admin/home'
    },
    {
      name: 'Archive',
      active: false,
      path: 'admin/archive'
    }
  ];

  constructor(
    private router: Router,
    private location: Location,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {}
  ngOnInit() {
    this.setActiveItemByUrl(this.items);
    
  }

  goToItem(item) {
    this.setActive(this.items, item);
    if (item.isModal) {
      const itemModal = this.modalService.open(item.component, {
        windowClass: 'course-lesson-modal',
        size: 'lg',
        backdrop: 'static'
      });
      itemModal.componentInstance.addCourse = true;
      itemModal.componentInstance.isComplete.subscribe(() => {
        this.toastr.success('Lesson successfully added', null, ToasterOptions);
        this.router.navigateByUrl(item.modalPath);
      });
    } else {
      this.router.navigateByUrl(item.path);
    }
  }

  setActive(items: any, selectedItem: any) {
    items.forEach(item => {
      item.active = false;
      if (item.name === selectedItem.name) {
        item.active = true;
      }
    });
  }

  setActiveItemByUrl(items: any): void {
    items.forEach(item => {
      if ('/' + item.path === this.location.path()) {
        this.setActive(items, item);
      }
    });
  }

}
