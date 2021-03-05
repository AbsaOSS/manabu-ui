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
  selector: 'app-loader',
  template: `
  <div class="manabu-loader">
    <div class="loader-quad loader-quad-default loader-quad-1"></div>
    <div class="loader-quad loader-quad-default loader-quad-2"></div>
    <div class="loader-quad loader-quad-default loader-quad-3"></div>
    <div class="loader-quad loader-quad-default loader-quad-4"></div>
    </div>
  `
})
export class LoaderComponent {}
