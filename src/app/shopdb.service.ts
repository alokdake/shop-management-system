import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShopdbService {
  shopUrl = 'http://localhost:6000/allProducts';
  registerUrl = 'http://localhost:6000/registeredUsers';
  apiUrl!: string;

  constructor(public http: HttpClient) {}

  getUserDetails() {
    let header = new HttpHeaders();
    return this.http.get<any>(this.apiUrl);
  }

  getShop() {
    let header = new HttpHeaders();
    return this.http.get<any>(this.shopUrl);
  }

  getAllUsers() {
    let header = new HttpHeaders();
    return this.http.get<any>(this.registerUrl);
  }
  updateProductDetails(id: any, value: any) {
    return this.http.put<any>(this.shopUrl + id, value);
  }

  postRegisteredDetails(registerModel: any) {
    console.log(registerModel);
    return this.http.post<any>(
      'http://localhost:6000/registeredUser',
      registerModel
    );
  }
}
