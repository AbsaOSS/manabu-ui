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
import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ToasterOptions } from 'src/app/models/toasterOptions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rate-course',
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.scss']
})
export class RateCourseComponent implements OnInit {
  selectedValue: number=0;
  userComments: string='';
  @Input() course;
  constructor( private courseService: CourseService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,private router:Router ){} 

  ngOnInit() {
  } 
  gotoHome(){
    setTimeout(()=>{
      this.courseService.avarageRating(this.course);
      this.router.navigate(['user/home']);
    },2000); 
  }
  
   countStar(selectedValue) {
    this.selectedValue = selectedValue;
  }

    rateCourse(course) {
    const userRating=this.selectedValue;
    const userReview = this.userComments
    this.courseService.rateCourse(course,userRating,userReview).then((resp) => {
    this.toastr.success(this.selectedValue +'/5 thank You ', null, ToasterOptions);
    });
    this.activeModal.dismiss();
    this.gotoHome();
  }

  
}
