import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
  }

  // urlFront = 'http://192.168.2.57:8081'; // 本地服务
  urlFront = 'http://47.102.139.16:8081';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': undefined
    })
  };

  /*用户登录*/
  login(logins): Observable<any> {
    return this.http.post(this.urlFront + '/login', logins);
  }
}
