import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./Component/OtherComponent/HomeComponent/Home.component";
import {PersonPageComponent} from "./Component/PersonComponent/PersonPageComponent/PersonPage.component";
import {PersonOrderComponent} from "./Component/PersonComponent/PersonOrderComponent/PersonOrder.component";
import {
  ProductPersonOrderComponent
} from "./Component/PersonComponent/ProductPersonOrderComponent/ProductPersonOrder.component";
import {InfoComponent} from "./Component/PersonComponent/InfoComponent/Info.component";
import {CartProductComponent} from "./Component/PersonComponent/CartProductComponent/CartProduct.component";
import {LoginComponent} from "./Component/OtherComponent/LoginComponent/Login.component";
import {RegisterComponent} from "./Component/OtherComponent/RegisterComponent/Register.component";
import {AdminPageComponent} from "./Component/AdminComponent/AdminPageComponent/AdminPage.component";
import {PersonListComponent} from "./Component/AdminComponent/PersonComponent/Personcomponent";
import {AddProductComponent} from "./Component/AdminComponent/AddProductComponent/AddProduct.component";
import {UpdateProductComponent} from "./Component/AdminComponent/UpdateProductComponent/UpdateProduct.component";
import {NgModule} from "@angular/core";
import {ProductComponent} from "./Component/OtherComponent/ProductComponent/Product.component";
import {personGuard} from "./Guard/PersonGuard/person.guard";
import {adminGuard} from "./Guard/AdminGuard/admin.guard";
import {loginGuard} from "./Guard/LoginGuard/login.guard";
import {
  PersonOrderAdminComponent
} from "./Component/AdminComponent/PersonOrderAdminComponent/PersonOrderAdmin.component";
import {
  ProductPersonOrderAdminComponent
} from "./Component/AdminComponent/ProductPersonOrderAdminComponent/ProductPersonOrderAdmin.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductComponent},
  {
    path: 'personPage', component: PersonPageComponent, canActivate: [personGuard], children: [
      {path: 'personOrderList', component: PersonOrderComponent},
      {path: 'personOrderList/:id', component: ProductPersonOrderComponent},
      {path: 'info', component: InfoComponent},
      {path: 'cartProductList', component: CartProductComponent}
    ]
  },
  {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [loginGuard]},
  {
    path: 'adminPage', component: AdminPageComponent, canActivate: [adminGuard], children: [
      {path: 'personList', component: PersonListComponent},
      {path: 'personList/:id', component: PersonOrderAdminComponent},
      {path: 'personList/:id1/:id2', component: ProductPersonOrderAdminComponent},
      {path: 'addProduct', component: AddProductComponent},
      {path: 'updateProductList', component: UpdateProductComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
