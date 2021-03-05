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
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Role';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from 'src/app/shared/notifications/notifications.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdminViewing: boolean = false;
  isAdminViewKey: string;
  notifications: number;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.setUsersView();
    this.adminKeyCheck();
    this.getNotifications();
  }

  setUsersView() {
    let userRole: any = KeycloakService.getUserAccessPermissions();

    if (userRole === Role.Admin) {
      this.isAdminViewing = true;
    }
  }

  adminKeyCheck() {
    this.isAdminViewKey = this.adminService.adminViewKey();
  }

  homeClicked() {
    let userRole: any = KeycloakService.getUserAccessPermissions();

    if (userRole === Role.Admin && localStorage.getItem('adminView') === 'true') {
      this.router.navigateByUrl('admin/home');
    } else if (userRole === Role.User || (userRole === Role.Admin && localStorage.getItem('adminView') === 'false')) {
      this.router.navigateByUrl('user/home');
    } else {
      this.router.navigateByUrl('superAdmin');
    }
  }

  switchAdminView() {
    this.adminService.switchAdminViewKeys().then(() => {
      if (localStorage.getItem('adminView') === 'true') {
        this.adminKeyCheck();
        this.router.navigateByUrl('admin/home');
      } else {
        this.adminKeyCheck();
        this.router.navigateByUrl('user/home');
      }
    });
  }

  logout() {
    KeycloakService.logout();
    localStorage.removeItem('adminView');
  }

  getNotifications() {
    this.notificationService.getNotifications().then((resp) => (this.notifications = resp.notifications));
  }

  viewNotifications() {
    const notificationsModalRef = this.modalService.open(NotificationsComponent, {
      windowClass: 'contributor-modal',
      size: 'lg'
    });

    notificationsModalRef.componentInstance.isAdmin = this.isAdminViewing;
    notificationsModalRef.componentInstance.notificationsSeen.subscribe(() => this.getNotifications());
  }
}
