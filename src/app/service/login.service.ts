import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
  }

  urlFront = 'http://192.168.2.28:8081';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': undefined
    })
  };

  /*用户登录*/
  login(logins) {
    console.log(3333);
    this.http.post(this.urlFront + '/login', logins).subscribe(
      res => {
        console.log(res);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  /*上传图片*/
  upload(value): Observable<any> {
    return this.http.post('http://192.168.2.28:8082/goods/img/upload', value, {
      /*headers: { "Content-Type": undefined }*/
    });
  }
}
