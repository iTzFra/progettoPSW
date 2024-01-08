import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {AddPersonDTO} from "../../Model/DTO/PersonDTO/AddPersonDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenEndpoint: string = 'http://localhost:8080/realms/progettoPSW/protocol/openid-connect/token'

  private endSessionEndpoint: string = 'http://localhost:8080/realms/progettoPSW/protocol/openid-connect/logout'

  private backendUrl: string = 'http://localhost:8081'

  private jwt: JwtHelperService = new JwtHelperService()

  constructor(private http: HttpClient, private router: Router) {
  }

  public getToken(): string | null {
    return localStorage.getItem('TOKEN');
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('RTOKEN');
  }

  public isLogged(): boolean {
    let accessToken: string | null = window.localStorage.getItem('TOKEN');
    let refreshToken: string | null = window.localStorage.getItem('RTOKEN');
    return !(accessToken === null || refreshToken === null);
  }

  public isAdminLogged(): boolean {
    return this.isLogged() && this.getRole().includes("admin")
  }

  public isPersonLogged(): boolean {
    return this.isLogged() && this.getRole().includes("user")
  }

  public getRole() {
    let parsedResponse: string = JSON.stringify(window.localStorage.getItem('TOKEN'));
    let decodedToken = this.jwt.decodeToken(parsedResponse);
    return decodedToken.resource_access.progettoPSW.roles;
  }

  public addPerson(addPersonDTO: AddPersonDTO): Observable<any> {
    return this.http.post<any>(this.backendUrl + '/addPerson', addPersonDTO)
  }

  public login(username: string, password: string): Observable<any> {
    let body = {client_id: 'progettoPSW', grant_type: 'password', username: username, password: password}
    let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post<any>(this.tokenEndpoint, this.urlEncode(body), {headers: header, observe: 'response'})
  }

  public logout(): Observable<any> {
    let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let body = {client_id: 'progettoPSW', refresh_token: this.getRefreshToken()}
    return this.http.post<any>(this.endSessionEndpoint, this.urlEncode(body), {headers: header})
  }

  public refreshToken(): Observable<any> {
    let body = {client_id: 'progettoPSW', grant_type: 'refresh_token', refresh_token: this.getRefreshToken()}
    let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post<any>(this.tokenEndpoint, this.urlEncode(body), {headers: header});
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
