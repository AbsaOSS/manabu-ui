import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { AppConfig } from 'src/app/app.config';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  ngOnInit() {}
}
