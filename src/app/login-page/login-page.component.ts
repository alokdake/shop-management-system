import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { ShopdbService } from '../shopdb.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  public email!: any;
  public password!: any;
  noResultReturned!: boolean;

  allUsersData: any = [];
  allEmailAddres: any;

  constructor(
    public http: HttpClient,
    private shopDB: ShopdbService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder //angular property declare in construct
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.getAllUserDetails();
  }

  getAllUserDetails() {
    this.shopDB.getUserDetails().subscribe((data) => {
      console.log('data has come');
      console.log(data);

      data.forEach((element: any) => {
        this.allUsersData.push({
          EmailAddress: element.EmailAddress,
        });
        console.log(this.allUsersData.EmailAddress);
      });
    });
  }

  submitForm() {
    console.log(this.loginForm.value);
    this.noResultReturned = true;
    this.http.get<any>(' http://localhost:9000/registeredUsers').subscribe(
      (result: any[]) => {
        console.log(result);
        const user = result.find((x: any) => {
          return (
            x.email == this.loginForm.value.email &&
            x.password == this.loginForm.value.password
          );
        });

        if (user) {
          this.noResultReturned = false;
          this.toastr.success('Login Succussful');
          // localStorage.setItem('userData', JSON.stringify(user));
          localStorage.setItem('userData', JSON.stringify(user));
          this.router.navigate(['/homePage']);
        } else {
          this.toastr.warning('Invalid Email or Password');
          // this.router.navigate(['/registerPage']);
        }
      },
      (err: any) => {
        this.toastr.warning('Something went wrong');
        this.router.navigate(['/loginPage']);
      }
    );
  }

  register() {
    this.router.navigate(['/registerPage']);
  }
}
