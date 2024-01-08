import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {HomeComponent} from './Component/OtherComponent/HomeComponent/Home.component';
import {NavbarComponent} from "./Component/OtherComponent/NavbarComponent/Navbar.component";
import {FooterComponent} from './Component/OtherComponent/FooterComponent/Footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PersonPageComponent} from './Component/PersonComponent/PersonPageComponent/PersonPage.component';
import {LoginComponent} from './Component/OtherComponent/LoginComponent/Login.component';
import {RegisterComponent} from './Component/OtherComponent/RegisterComponent/Register.component';
import {AdminPageComponent} from './Component/AdminComponent/AdminPageComponent/AdminPage.component';
import {PersonOrderComponent} from './Component/PersonComponent/PersonOrderComponent/PersonOrder.component';
import {PersonListComponent} from './Component/AdminComponent/PersonComponent/Personcomponent';
import {InfoComponent} from "./Component/PersonComponent/InfoComponent/Info.component";
import {AddProductComponent} from './Component/AdminComponent/AddProductComponent/AddProduct.component';
import {CartProductComponent} from './Component/PersonComponent/CartProductComponent/CartProduct.component';
import {
  ProductPersonOrderComponent
} from './Component/PersonComponent/ProductPersonOrderComponent/ProductPersonOrder.component';
import {ProductComponent} from './Component/OtherComponent/ProductComponent/Product.component';
import {UpdateProductComponent} from "./Component/AdminComponent/UpdateProductComponent/UpdateProduct.component";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {WarningComponent} from './Component/OtherComponent/WarningComponent/Warning.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AuthService} from "./Service/AuthService/auth.service";
import {Interceptor} from "./Interceptor/Interceptor";
import {
  PersonOrderAdminComponent
} from './Component/AdminComponent/PersonOrderAdminComponent/PersonOrderAdmin.component';
import {
  ProductPersonOrderAdminComponent
} from './Component/AdminComponent/ProductPersonOrderAdminComponent/ProductPersonOrderAdmin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    PersonPageComponent,
    LoginComponent,
    RegisterComponent,
    AdminPageComponent,
    PersonOrderComponent,
    PersonListComponent,
    InfoComponent,
    AddProductComponent,
    CartProductComponent,
    ProductComponent,
    ProductPersonOrderComponent,
    ProductComponent,
    UpdateProductComponent,
    WarningComponent,
    PersonOrderAdminComponent,
    ProductPersonOrderAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
