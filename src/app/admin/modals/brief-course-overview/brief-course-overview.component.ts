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
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-brief-course-overview',
  templateUrl: './brief-course-overview.component.html',
  styleUrls: ['./brief-course-overview.component.scss']
})
export class BriefCourseOverviewComponent implements OnInit {
  @Input() description: string;
  @Input() courseTitle: string;
  @Input() courseImage: string;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
