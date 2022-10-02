import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShopdbService } from '../shopdb.service';
import { ViewproductdetailsComponent } from '../viewproductdetails/viewproductdetails.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  shopData: any = [];
  userdata: any;
  showImage!: boolean;

  productEmail: any;
  loggedInUserEmail: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private tostr: ToastrService,
    private MyDB: ShopdbService
  ) {}

  ngOnInit(): void {
    this.userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(this.userdata);
    this.loggedInUserEmail = this.userdata.email;
    console.log(this.loggedInUserEmail);
    this.getShopDetails();
  }

  getShopDetails() {
    this.MyDB.getShop().subscribe((result) => {
      console.log(result);
      result.forEach((element: any) => {
        this.shopData.push(element);
        this.productEmail = element.email;
        console.log(this.productEmail);
        console.log(element.showEditOption);
        if (this.productEmail == this.loggedInUserEmail) {
          element.showEditOption = true;
          console.log('true');
        } else {
          element.showEditOption = false;
        }
      });
      console.log(this.shopData);
    });
  }

  viewDetails(item: any) {
    console.log(item);
    localStorage.setItem('productDetails', JSON.stringify(item));
    this.router.navigate(['/viewproductdetails']);
  }

  editProduct(item: any) {
    console.log(item);
    localStorage.setItem('id', JSON.stringify(item));
    this.router.navigate(['/sellMyProduct']);
  }
}
