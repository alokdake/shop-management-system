import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShopdbService {
  shopUrl = 'http://localhost:9000/allProducts';
  registerUrl = 'http://localhost:9000/registeredUsers';
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

  addProducts(product: Product) {
    return this.http.post<Product>(this.shopUrl, product);
  }

  getAllUsers() {
    let header = new HttpHeaders();
    return this.http.get<any>(this.registerUrl);
  }
  updateProductDetails() {
    // return this.http.put<any>(this.shopUrl + id, value);
  }

  postRegisteredDetails(registerModel: any) {
    console.log(registerModel);
    return this.http.post<any>(
      'http://localhost:9000/registeredUser',
      registerModel
    );
  }
}
