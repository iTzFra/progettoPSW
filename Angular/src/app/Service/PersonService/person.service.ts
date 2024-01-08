import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UpdatePersonDTO} from "../../Model/DTO/PersonDTO/UpdatePersonDTO";
import {Observable} from "rxjs";
import {Person} from "../../Model/Entity/Person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private backendUrl: string = 'http://localhost:8081';

  constructor(private http: HttpClient) {
  }

  public getLoggedPerson(): Observable<Person> {
    return this.http.get<Person>(this.backendUrl + '/getLoggedPerson')
  }

  public updatePerson(updatePersonDTO: UpdatePersonDTO): Observable<any> {
    return this.http.put<any>(this.backendUrl + '/updatePerson', updatePersonDTO)
  }

  public showPersons(pageNumber: number, pageSize: number, sortBy: string): Observable<Person[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('pageNumber', pageNumber);
    params = params.set('pageSize', pageSize);
    params = params.set('sortBy', sortBy);
    return this.http.get<Person[]>(this.backendUrl + '/showPersons', {params: params});
  }

  public showPersonsByEmail(pageNumber: number, pageSize: number, sortBy: string, email: string): Observable<Person[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('pageNumber', pageNumber);
    params = params.set('pageSize', pageSize);
    params = params.set('sortBy', sortBy);
    params = params.set('email', email);
    return this.http.get<Person[]>(this.backendUrl + '/showPersonsByEmail', {params: params});
  }
}
