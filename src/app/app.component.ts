import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shoppingManagementSystem';
  profilePicture: any;
  shopData: any = [];
  userdata: any;
  isUserLoggedOut!: boolean;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn();
    if (this.userdata != null) {
      this.profilePicture = this.userdata.profilePic;
      console.log(this.profilePicture);
    }
  }
  isUserLoggedIn() {
    var loggedInUser = localStorage.getItem('userData');
    if (loggedInUser != null && loggedInUser != undefined) {
      this.userdata = JSON.parse(loggedInUser);
      console.log(this.userdata);
      if (this.userdata != null) {
        this.profilePicture = this.userdata.profilePic;
        console.log(this.profilePicture);
      }
    }
  }

  userlogin() {
    this.router.navigate(['/loginPage']);
  }

  userlogout() {
    this.tostr.warning('Logout Successfull');
    localStorage.removeItem('userData');
    this.userdata = '';
    location.reload;
    this.router.navigate(['/loginPage']);
  }

  userregister() {
    this.router.navigate(['/registerPage']);
  }

  sellMyProduct() {
    if (this.userdata !== null && this.userdata !== undefined) {
      this.router.navigate(['/sellMyProduct']);
    } else {
      this.router.navigate(['/loginPage']);
    }
  }

  myProfilrDetails() {}
}
