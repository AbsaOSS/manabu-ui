import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from './services/keycloak.service';
import { AdminService } from './services/admin.service';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showAdminBanner = false;
  adminIsViewingAsAdmin: boolean = true;

  constructor(private adminService: AdminService, public router: Router) {}

  ngOnInit() {
    this.adminService.accessUserView$.subscribe((showAdminBanner) => {
      this.showAdminBanner = showAdminBanner;
    });

    this.setUsersView();
  }

  setUsersView() {
    let userRole = KeycloakService.getUserAccessPermissions();

    switch (userRole) {
      case Role.User:
        this.router.navigate(['/user/course']);
        break;
      case Role.Admin:
        this.setAdminView();
        break;
      case Role.Super:
        this.router.navigate(['superAdmin']);
        break;
    }
  }

  setAdminView() {
    this.showAdminBanner = true;
    if (localStorage.getItem('adminView') === null) {
      this.adminService.setAdminKeyView();
    }

    if (localStorage.getItem('adminView') === 'false') {
      this.adminIsViewingAsAdmin = false;
      this.router.navigate(['/user/course']);
    }
  }

  getLayoutClass() {
    if (
      this.showAdminBanner &&
      (this.router.url === '/admin/home' ||
        this.router.url === '/admin/managePresentations' ||
        this.router.url === '/admin/archive' ||
        this.router.url === '/admin/courseAnalysis')
    ) {
      return 'main-admin-view';
    } else if (this.showAdminBanner && this.router.url === '/admin/personalInfo') {
      return 'admin-personal-details-view';
    } else if (!this.showAdminBanner) {
      return 'user-view';
    } else {
      return 'admin-user-view';
    }
  }
}
