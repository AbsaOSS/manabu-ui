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
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

export type StateType = 'hide' | 'show';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('drawerPanel', [
      state('hide', style({ right: '-310px' }), { params: { width: '350px' } }),
      state('show', style({ right: '0px' })),
      transition('* => *', animate(300))
    ]),
    trigger('slideButton', [
      state('hide', style({ right: '40px' })),
      state('show', style({ right: '{{width}}' }), { params: { width: '350px' } }),
      transition('* => *', animate(300))
    ])
  ]
})
export class SidePanelComponent implements OnInit {
  @Input() state: StateType = 'hide';
  @Input() width = '350px';

  constructor() {}

  ngOnInit() {}

  onToggle() {
    this.state = this.state == 'show' ? 'hide' : 'show';
  }
}
