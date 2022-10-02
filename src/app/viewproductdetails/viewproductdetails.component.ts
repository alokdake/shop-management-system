import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewproductdetails',
  templateUrl: './viewproductdetails.component.html',
  styleUrls: ['./viewproductdetails.component.scss'],
})
export class ViewproductdetailsComponent implements OnInit {
  shopSeeData: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.shopSeeData = JSON.parse(
      localStorage.getItem('productDetails') || '{}'
    );
    console.log(this.shopSeeData);
  }
  byeProduct() {}
}
