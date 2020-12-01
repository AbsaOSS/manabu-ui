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
