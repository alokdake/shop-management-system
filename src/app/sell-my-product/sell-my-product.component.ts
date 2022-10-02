import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ShopdbService } from '../shopdb.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from '../model/product.model';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-sell-my-product',
  templateUrl: './sell-my-product.component.html',
  styleUrls: ['./sell-my-product.component.scss'],
})
export class SellMyProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: any;
  @ViewChild('Year') Year!: ElementRef;
  message!: string;
  url!: string | ArrayBuffer | null;
  fname: any;
  lname: any;
  selectedYear: any;
  userdata: any;
  loggedInUserEmail: any;
  constructor(
    private MyDB: ShopdbService,
    private formBuilder: FormBuilder,
    private router: Router,
    public http: HttpClient,
    private toastr: ToastrService
  ) {
    // const productModel = {
    //   email: '',
    //   fname: '',
    //   lname: '',
    //   Address: '',
    //   phoneno: 0,
    //   profilePic: '',
    //   Productname: '',
    //   Productbrand: '',
    //   Productprice: 0,
    //   pickeryear: 0,
    //   Productcategory: '',
    //   Productdescription: '',
    //   file: '',
    //   date: 0,
    // };
  }

  public sellForm!: FormGroup;
  public name!: any;
  public email!: any;
  public phoneno!: any;
  public Address!: any;
  public Productname!: any;
  public Productbrand!: any;
  public Productprice!: any;
  public Productyear!: any;
  public Productcategory!: any;
  public Productdescription!: any;
  public file!: any;
  public profilePic = this.url;
  public pickeryear!: any;
  result: any = [];
  date: Date | undefined;
  productId: any;

  // @Input() product: Product;
  // @Output() onEditProduct = new EventEmitter<number>();

  ngOnInit(): void {
    this.userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(this.userdata);
    this.loggedInUserEmail = this.userdata.email;
    console.log(this.loggedInUserEmail);
    this.productId = JSON.parse(localStorage.getItem('id') || '{}');
    console.log(this.productId);
    this.onEdit();

    this.sellForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      Productname: new FormControl('', [Validators.required]),
      Productbrand: new FormControl('', [Validators.required]),
      Productprice: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      phoneno: new FormControl('', [Validators.required]),
      pickeryear: new FormControl('', [Validators.required]),
      Productcategory: new FormControl('', [Validators.required]),
      Productdescription: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }

  addProduct() {
    let sellModel = {
      email: this.email,
      fname: this.fname,
      lname: this.lname,
      Address: this.Address,
      phoneno: this.phoneno,
      profilePic: this.profilePic,
      Productname: this.Productname,
      Productbrand: this.Productbrand,
      Productprice: this.Productprice,
      pickeryear: this.pickeryear,
      Productcategory: this.Productcategory,
      Productdescription: this.Productdescription,
      file: this.file,
      date: this.date,
    };

    console.log(sellModel);

    if (this.loggedInUserEmail === this.sellForm.value.email) {
      this.http
        .post<any>('http://localhost:6000/allProducts', sellModel)
        .subscribe((result) => {
          this.toastr.success('Product Added sucessfully');
          console.log(result);
          this.router.navigate(['/homePage']);
          this.sellForm.reset();
        });
      (_err: any) => {
        this.toastr.warning('Something went wrong');
      };
      localStorage.setItem('result', JSON.stringify(this.result));
    } else {
      this.toastr.warning('User Is Not Exists. Please Register ');
      this.router.navigate(['/registerPage']);
    }
  }

  deleteForm() {
    this.router.navigate(['/homePage']);
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

  onEdit() {
    // this.onEditProduct.emit(this.productId);
  }

  updateProduct() {
    this.MyDB.updateProductDetails(
      this.productId,
      this.sellForm.value
    ).subscribe((result: any[]) => {
      console.log(result);
    });
  }
}
