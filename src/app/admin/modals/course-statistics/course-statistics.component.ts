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
import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-statistics',
  templateUrl: './course-statistics.component.html',
  styleUrls: ['./course-statistics.component.scss']
})
export class CourseStatisticsComponent implements OnInit {

  @Input() graphDisplayValues;
  @Input() showYAxis;
  @Input() showXAxis;
  @Input() showGridLines;
  @Input() colorScheme;
  @Input() showLabels;
  @Input() gradient;
  @Input() animations;
  @Input() courseLength;
  @Input() courseItems;



  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
