import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class UserHomeComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
      this.router.navigate(['user/course']);
  }

}
