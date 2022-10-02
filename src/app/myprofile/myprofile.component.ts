import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PicComponent } from '../pic/pic.component';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})
export class MyprofileComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  userData: any;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(this.userData);
  }

  openDialog(userData: any) {
    const dialogRef = this.dialog.open(PicComponent);
    localStorage.setItem('pic', JSON.stringify(userData));
  }
}
