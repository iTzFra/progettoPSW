import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UpdateProductDTO} from "../../Model/DTO/ProductDTO/UpdateProductDTO";
import {AddProductDTO} from "../../Model/DTO/ProductDTO/AddProductDTO";
import {Product} from "../../Model/Entity/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private backendUrl: string = 'http://localhost:8081';

  constructor(private http: HttpClient) {
  }

  public showProducts(pageNumber: number, pageSize: number, sortBy: string): Observable<Product[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('pageNumber', pageNumber);
    params = params.set('pageSize', pageSize);
    params = params.set('sortBy', sortBy);
    return this.http.get<Product[]>(this.backendUrl + '/showProducts', {params: params});
  }

  public showProductsByProductName(pageNumber: number, pageSize: number, sortBy: string, productName: string): Observable<Product[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('pageNumber', pageNumber);
    params = params.set('pageSize', pageSize);
    params = params.set('sortBy', sortBy);
    params = params.set('productName', productName);
    return this.http.get<Product[]>(this.backendUrl + '/showProductsByProductName', {params: params});
  }

  public updateProduct(updateProductDTO: UpdateProductDTO): Observable<any> {
    return this.http.put<any>(this.backendUrl + '/updateProduct', updateProductDTO)
  }

  public addProduct(addProductDTO: AddProductDTO): Observable<any> {
    return this.http.post<any>(this.backendUrl + '/addProduct', addProductDTO)
  }
}
