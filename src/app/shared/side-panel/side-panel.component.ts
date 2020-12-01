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
