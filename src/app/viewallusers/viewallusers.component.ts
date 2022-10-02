import { Component, OnInit } from '@angular/core';
import { ShopdbService } from '../shopdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewallusers',
  templateUrl: './viewallusers.component.html',
  styleUrls: ['./viewallusers.component.scss'],
})
export class ViewallusersComponent implements OnInit {
  constructor(private router: Router, private MyDB: ShopdbService) {}

  UsersData: any = [];

  ngOnInit(): void {
    this.getAllUserDetails();
  }

  getAllUserDetails() {
    this.MyDB.getAllUsers().subscribe((result) => {
      console.log(result);
      result.forEach((element: any) => {
        this.UsersData.push(element);
      });
      console.log(this.UsersData);
    });
  }
  viewDetails(item: any) {
    console.log(item);
    localStorage.setItem('userDetails', JSON.stringify(item));
    this.router.navigate(['/viewprofile']);
  }
}
