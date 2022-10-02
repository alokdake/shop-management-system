import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pic',
  templateUrl: './pic.component.html',
  styleUrls: ['./pic.component.scss'],
})
export class PicComponent implements OnInit {
  constructor() {}
  picShow: any;

  ngOnInit(): void {
    this.picShow = JSON.parse(localStorage.getItem('pic') || '{}');
    console.log(this.picShow);
  }
}
