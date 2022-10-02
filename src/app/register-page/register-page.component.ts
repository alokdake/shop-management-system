import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  message!: string;
  url!: string | ArrayBuffer | null;
  fname: any;
  lname: any;
  submitForm() {
    throw new Error('Method not implemented.');
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public http: HttpClient,
    private toastr: ToastrService
  ) {}

  registerDetails: any;

  public RegisterForm!: FormGroup;
  public email!: any;
  public password!: any;
  public conformPassword!: any;
  public name!: any;
  public info!: any;
  public Address!: any;
  public phoneno!: any;
  public profilePic = this.url;

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl('', [Validators.required]),
      conformPassword: new FormControl('', [Validators.required]),
      fname: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      lname: new FormControl('', [Validators.maxLength(10)]),
      info: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      phoneno: new FormControl('', [Validators.required]),
      profilePic: new FormControl('', [Validators.required]),
    });
  }

  submitform() {
    let registerModel = {
      email: this.email,
      password: this.password,
      conformPassword: this.conformPassword,
      fname: this.fname,
      lname: this.lname,
      info: this.info,
      Address: this.Address,
      phoneno: this.phoneno,
      profilePic: this.profilePic,
    };

    console.log(registerModel);

    // this.registerDetails = this.RegisterForm.value;
    // console.log(this.registerDetails);

    this.http.get<any>(' http://localhost:6000/registeredUsers').subscribe(
      (result) => {
        console.log(result);
        const user = result.find((x: any) => {
          return x.email === this.RegisterForm.value.email;
        });

        if (user) {
          this.toastr.warning('User Already Exists');
        } else {
          this.http
            .post<any>(' http://localhost:6000/registeredUsers', registerModel)
            .subscribe((result) => {
              this.toastr.success('Register Successful');
              console.log(result);
              this.router.navigate(['/loginPage']);
              this.RegisterForm.reset();
            });
        }
      },
      (err) => {
        this.toastr.warning('Something went wrong');
      }
    );
  }
  loginform() {
    this.router.navigate(['/loginPage']);
  }

  selectFile(event: any) {
    var imageType = event.target.files[0].type;

    if (imageType.match(/image\/*/) == null) {
      this.message = 'only images you can add';
      return;
    }

    var imageReader = new FileReader(); //pre defined method in angular ts FileReader()
    imageReader.readAsDataURL(event.target.files[0]);

    imageReader.onload = (_event) => {
      this.message = '';
      this.url = imageReader.result;
      console.log(this.url);
      this.profilePic = imageReader.result;
    };
  }
}
