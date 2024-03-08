import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CutTextPipe } from './cut-text.pipe' ;
import {BrowserAnimationsModule} from "@angular/platform-browser/animations" ;
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DetailsComponent } from './details/details.component';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './payment/payment.component';
import { AllordersComponent } from './allorders/allorders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './loading.interceptor';
import { SearchPipe } from './search.pipe';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CashDetailsComponent } from './cash-details/cash-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    RegisterComponent,
    LoginComponent,
    CutTextPipe,
    DetailsComponent,
    PaymentComponent,
    AllordersComponent,
    SearchPipe,
    WishlistComponent,
    CategoryDetailsComponent,
    CashDetailsComponent ,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule ,
    BrowserAnimationsModule ,
    CarouselModule ,
    ToastrModule.forRoot(),
    NgxPaginationModule ,
    NgxSpinnerModule ,
    FormsModule ,
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:MyhttpInterceptor , multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
