import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddCartProductDTO} from "../../Model/DTO/CartProductDTO/AddCartProductDTO";
import {UpdateCartProduct} from "../../Model/DTO/CartProductDTO/UpdateCartProduct";
import {CartProduct} from "../../Model/Entity/CartProduct";
import {Cart} from "../../Model/Entity/Cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private backendUrl: string = 'http://localhost:8081';

  constructor(private http: HttpClient) {
  }

  public showCartProducts(): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(this.backendUrl + '/showCartProducts')
  }

  public addCartProduct(addCartProductDTO: AddCartProductDTO): Observable<any> {
    return this.http.post<any>(this.backendUrl + '/addCartProduct', addCartProductDTO)
  }

  public updateCartProduct(cartProduct: UpdateCartProduct): Observable<any> {
    return this.http.put<any>(this.backendUrl + '/updateCartProduct', cartProduct)
  }

  public deleteCartProduct(id: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set('id', id);
    return this.http.delete<any>(this.backendUrl + '/deleteCartProduct', {params: params});
  }

  public getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.backendUrl + '/getCart')
  }
}
