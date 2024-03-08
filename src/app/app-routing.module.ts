import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { DetailsComponent } from './details/details.component';
import { PaymentComponent } from './payment/payment.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CashDetailsComponent } from './cash-details/cash-details.component';
import { AllordersComponent } from './allorders/allorders.component';

const routes: Routes = [
  {path:"" , redirectTo:"home" , pathMatch:"full" , title: 'home'},
  {path:"register"  ,component:RegisterComponent , title:'register'},
  {path:"login"  , component:LoginComponent , title:'login'},
  {path:"home" ,canActivate:[authGuard] , component:HomeComponent , title:'home'},
  {path:"cart" ,canActivate:[authGuard] , component:CartComponent  , title:'cart'},
  {path:"products" ,canActivate:[authGuard] , component:ProductsComponent , title:'products'},
  {path:"categories" ,canActivate:[authGuard] , component:CategoriesComponent , title:'categories'},
  {path:"wishlist" ,canActivate:[authGuard] , component:WishlistComponent , title:'wishlist'},
  {path:"brands" ,canActivate:[authGuard] , component:BrandsComponent , title:'brands'},
  {path:"allOrders" ,canActivate:[authGuard] , component:AllordersComponent , title:'allOrders'},
  {path:"payment/:id" ,canActivate:[authGuard] , component:PaymentComponent , title:'payment'},
  {path:"cashDetails/:id" ,canActivate:[authGuard] , component:CashDetailsComponent , title:'cashDetails'},
  {path:"details/:id" , canActivate:[authGuard] , component:DetailsComponent, title:'product details'} ,
  {path:"catDetails/:id" , canActivate:[authGuard] , component:CategoryDetailsComponent, title:'category Details'} ,
  {path:"**" ,canActivate:[authGuard] , component:NotfoundComponent , title:'not found'},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
