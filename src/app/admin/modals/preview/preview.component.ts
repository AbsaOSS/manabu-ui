import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["../add-quiz/add-quiz.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PreviewComponent implements OnInit {
  @Input() courseId
  constructor(public activeModal: NgbActiveModal,
    public route:ActivatedRoute,private router:Router) {}

  ngOnInit() {}

  
  preview(courseId){
    this.router.navigate(['/user/courseDetails/', courseId, true]);
    this.activeModal.close();
  }
}
