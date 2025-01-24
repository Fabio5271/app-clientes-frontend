import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/login'

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, {responseType: 'text'})
  }

  logout() {
    localStorage.removeItem('userCreds');
    alert("Logout efetuado com sucesso!");
    this.router.navigate(['login']);
  }
}
