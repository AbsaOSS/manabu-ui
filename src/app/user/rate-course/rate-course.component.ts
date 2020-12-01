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
