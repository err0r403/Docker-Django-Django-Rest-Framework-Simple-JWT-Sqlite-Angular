import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    console.log('not rdy');
  }

  private tokenUrl = 'http://127.0.0.1:8000/api/token/';
  private verifyUrl = 'http://127.0.0.1:8000/api/token/verify/';

  public login(credentials: {}): Subscription {
    return this.getToken(credentials).subscribe((data) => {
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
    });
  }

  public getToken(credentials: {}): Observable<any> {
    return this.http.post(this.tokenUrl, credentials);
  }

  public logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  public isLoggedIn() {
    if (localStorage.getItem('access')){
      return this.http.post(this.verifyUrl, { token: localStorage.getItem('access') });
    } else {
      return new Observable<false>();
    }
  }

}
