import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PersonOrder} from "../../Model/Entity/PersonOrder";
import {ProductPersonOrder} from "../../Model/Entity/ProductPersonOrder";

@Injectable({
  providedIn: 'root'
})
export class PersonOrderService {
  private backendUrl: string = 'http://localhost:8081';

  constructor(private http: HttpClient) {
  }

  public addPersonOrder(): Observable<any> {
    let body = {}
    return this.http.post<any>(this.backendUrl + '/addPersonOrder', this.urlEncode(body))
  }

  public showPersonOrders(): Observable<PersonOrder[]> {
    return this.http.get<PersonOrder[]>(this.backendUrl + '/showPersonOrders')
  }

  public showPersonOrdersByPerson(id: number): Observable<PersonOrder[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('id', id);
    return this.http.get<PersonOrder[]>(this.backendUrl + '/showPersonOrdersByPerson', {params: params})
  }

  public showProductPersonOrders(personId: number, personOrderId: number): Observable<ProductPersonOrder[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('personId', personId);
    params = params.set('personOrderId', personOrderId);
    return this.http.get<ProductPersonOrder[]>(this.backendUrl + '/showProductPersonOrders', {params: params})
  }

  public showProductPersonOrdersByPerson(id: number): Observable<ProductPersonOrder[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('id', id);
    return this.http.get<ProductPersonOrder[]>(this.backendUrl + '/showProductPersonOrdersByPerson', {params: params})
  }

  private urlEncode(data: any): string {
    let urlSearchParams: URLSearchParams = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        urlSearchParams.append(key, data[key]);
      }
    }
    return urlSearchParams.toString();
  }
}
