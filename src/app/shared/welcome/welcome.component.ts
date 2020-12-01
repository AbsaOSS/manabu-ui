import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userName:string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = KeycloakService._user === undefined ? '' : KeycloakService._user.firstName;
  }
  switchToUserView() {
    this.router.navigate(['user/course']);
  }
}
