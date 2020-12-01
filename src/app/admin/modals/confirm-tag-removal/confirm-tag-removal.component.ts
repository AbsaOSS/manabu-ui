import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-tag-removal',
  templateUrl: './confirm-tag-removal.component.html',
  styleUrls: ['../add-quiz/add-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmTagRemovalComponent implements OnInit {
  @Input() tag;
  @Output() confirmTagRemoval: EventEmitter<null> = new EventEmitter<null>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  removeTag() {
    this.confirmTagRemoval.emit();
    this.activeModal.dismiss();
  }
}
