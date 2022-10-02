import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss'],
})
export class ViewprofileComponent implements OnInit {
  constructor() {}

  userData: any;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userDetails') || '{}');
    console.log(this.userData);
  }
}
