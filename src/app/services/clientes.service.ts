import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://localhost:8081/api/clientes'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {  });
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, data);
  }
  
  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
