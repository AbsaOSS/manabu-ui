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
import { QuizItem } from 'src/app/models/QuizItem';
import { Step, SubStep, StepStatus } from 'src/app/models/Step';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input() currentStep: number;
  @Input() steps: Step[] = [];
  @Input() currentSection: number;
  @Input() sections: SubStep[] = [];
  @Output() scrollTo: EventEmitter<string> = new EventEmitter<string>();
  @Output() loadStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() loadSection: EventEmitter<QuizItem> = new EventEmitter<QuizItem>();

  constructor() {}

  ngOnInit() {}

  setCurrentSection(value: string) {
    let nums: string[] = (value as string).split('_');
    if (nums.length > 1) {
      try {
        let num = Number.parseInt(nums[1]);
        if (num >= 0 && num < this.sections.length) {
          this.currentSection = num;
        }
      } catch (e) {}
    }
  }

  getStepClass(step: Step): string {
    if (step.status === StepStatus.Completed) {
      return 'completed';
    } else if (step.status === StepStatus.Watching) {
      return 'active';
    } else if (step.status === StepStatus.Current) {
      return 'current';
    } else {
      return 'inactive';
    }
  }

  getSectionClass(section: SubStep): string {
    return section.id <= this.currentSection ? 'active' : 'inactive';
  }

  stepClicked(lessonNumber) {
    this.loadStep.emit(lessonNumber);
  }

  sectionClicked(stepNumber, sectionId) {
    let item: QuizItem = {
      lesson: stepNumber,
      section: sectionId
    };
    this.loadSection.emit(item);
  }
}
