import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PicComponent } from './pic/pic.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SellMyProductComponent } from './sell-my-product/sell-my-product.component';
import { ViewallusersComponent } from './viewallusers/viewallusers.component';
import { ViewproductdetailsComponent } from './viewproductdetails/viewproductdetails.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';

const routes: Routes = [
  { path: 'homePage', component: HomePageComponent },
  { path: 'loginPage', component: LoginPageComponent },
  { path: 'registerPage', component: RegisterPageComponent },
  { path: 'sellMyProduct', component: SellMyProductComponent },
  { path: 'viewproductdetails', component: ViewproductdetailsComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: 'viewallusers', component: ViewallusersComponent },
  { path: 'viewprofile', component: ViewprofileComponent },
  { path: 'pic', component: PicComponent },

  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
