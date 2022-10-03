import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShopdbService } from '../app/shopdb.service';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from './model/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('fileInput') fileInput!: any;
  @ViewChild('Year') Year!: ElementRef;
  @ViewChild('sellmyProduct') sellmyProduct: any;
  title = 'shoppingManagementSystem';
  profilePicture: any;
  shopData: any = [];
  products: Product[] = [];
  isUserLoggedOut!: boolean;
  message!: string;
  url!: string | ArrayBuffer | null;
  userdata: any;
  loggedInUserEmail: any;
  public sellForm!: FormGroup;
  public profilePic = this.url;
  result: any = [];
  productId: any;
  showEditOption: boolean = false;
  file: any;
  productToDisplay: Product[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private tostr: ToastrService,
    private formBuilder: FormBuilder,
    private myDB: ShopdbService
  ) {
    this.sellForm = formBuilder.group({});
    this.products = [];
  }

  ngOnInit(): void {
    this.isUserLoggedIn();
    if (this.userdata != null) {
      this.profilePicture = this.userdata.profilePic;
      console.log(this.profilePicture);
    }

    this.sellForm = this.formBuilder.group({
      email: this.formBuilder.control(''),
      fname: this.formBuilder.control(''),
      lname: this.formBuilder.control(''),
      Productname: this.formBuilder.control(''),
      Productbrand: this.formBuilder.control(''),
      Productprice: this.formBuilder.control(''),
      Address: this.formBuilder.control(''),
      phoneno: this.formBuilder.control(''),
      Productcategory: this.formBuilder.control(''),
      Productdescription: this.formBuilder.control(''),
      file: this.formBuilder.control(''),
      date: this.formBuilder.control(''),
    });

    this.myDB.getShop().subscribe((res) => {
      for (let prod of res) {
        this.products.unshift(prod);
      }
      this.productToDisplay = this.products;
    });
  }

  isUserLoggedIn() {
    var loggedInUser = localStorage.getItem('userData');
    if (loggedInUser != null && loggedInUser != undefined) {
      this.userdata = JSON.parse(loggedInUser);
      console.log(this.userdata);
      if (this.userdata != null) {
        this.profilePicture = this.userdata.profilePic;
        console.log(this.profilePicture);
      }
    }
  }

  addProduct() {
    let product: Product = {
      email: this.email.value,
      fname: this.fname.value,
      lname: this.lname.value,
      Address: this.Address.value,
      phoneno: this.phoneno.value,
      Productname: this.Productname.value,
      Productbrand: this.Productbrand.value,
      Productprice: this.Productprice.value,
      Productcategory: this.Productcategory.value,
      Productdescription: this.Productdescription.value,
      file: this.file,
      date: this.date.value,
      showEditOption: this.showEditOption,
    };

    console.log(product);

    this.myDB.addProducts(product).subscribe((res: Product) => {
      this.products.unshift(res);
    });
  }

  editProduct(event: any) {
    this.products.forEach((val, ind) => {
      if (val.id === event) {
        this.setForm(val);
      }
    });
    this.removeProduct(event);
    this.sellmyProduct.nativeElement.click();
  }

  setForm(prod: Product) {
    this.fname.setValue(prod.fname);
    this.lname.setValue(prod.lname);
    this.email.setValue(prod.email);
    this.Address.setValue(prod.Address);
    this.phoneno.setValue(prod.phoneno);
    this.Productname.setValue(prod.Productname);
    this.Productbrand.setValue(prod.Productbrand);
    this.Productprice.setValue(prod.Productprice);
    this.Productcategory.setValue(prod.Productcategory);
    this.Productdescription.setValue(prod.Productdescription);
    this.file = '';
    this.date.setValue(prod.date);
  }

  removeProduct(event: any) {}

  updateProduct() {}

  clearForm() {
    this.fname.setValue('');
    this.lname.setValue('');
    this.email.setValue('');
    this.Address.setValue('');
    this.phoneno.setValue('');
    this.Productname.setValue('');
    this.Productbrand.setValue('');
    this.Productprice.setValue('');
    this.Productcategory.setValue('');
    this.Productdescription.setValue('');
    this.file.setValue('');
    this.date.setValue('');
  }

  deleteForm() {
    this.router.navigate(['/homePage']);
  }

  userlogin() {
    this.router.navigate(['/loginPage']);
  }

  userlogout() {
    this.tostr.warning('Logout Successfull');
    localStorage.removeItem('userData');
    this.userdata = '';
    location.reload;
    this.router.navigate(['/loginPage']);
  }

  userregister() {
    this.router.navigate(['/registerPage']);
  }

  sellMyProduct() {
    if (this.userdata !== null && this.userdata !== undefined) {
      this.router.navigate(['/sellMyProduct']);
    } else {
      this.router.navigate(['/loginPage']);
    }
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
      this.file = imageReader.result;
    };
  }
  public get email(): FormControl {
    return this.sellForm.get('email') as FormControl;
  }

  public get fname(): FormControl {
    return this.sellForm.get('fname') as FormControl;
  }

  public get lname(): FormControl {
    return this.sellForm.get('lname') as FormControl;
  }

  public get Address(): FormControl {
    return this.sellForm.get('Address') as FormControl;
  }

  public get phoneno(): FormControl {
    return this.sellForm.get('phoneno') as FormControl;
  }
  public get Productname(): FormControl {
    return this.sellForm.get('Productname') as FormControl;
  }

  public get Productbrand(): FormControl {
    return this.sellForm.get('Productbrand') as FormControl;
  }

  public get Productprice(): FormControl {
    return this.sellForm.get('Productprice') as FormControl;
  }

  public get Productcategory(): FormControl {
    return this.sellForm.get('Productcategory') as FormControl;
  }

  public get Productdescription(): FormControl {
    return this.sellForm.get('Productdescription') as FormControl;
  }

  public get date(): FormControl {
    return this.sellForm.get('date') as FormControl;
  }
}
