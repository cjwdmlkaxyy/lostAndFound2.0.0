import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // urlFront:string = 'http://192.168.2.28:8085';
  urlFront = 'http://47.102.139.16:8081/';

  constructor(
    private http: HttpClient
  ) {
  }

  /*校验信息*/
  checkInformation(flag, info): Observable<any> {
    let url = '';
    switch (flag) {
      case 'account' :  // 校验账号是否重复
        url = '/user/signloginacc/';
        break;
      case 'phone':
        url = '/user/signphone/';
        break;
      case 'email':
        url = '/user/signemail/';
        break;
    }
    return this.http.get(this.urlFront + url + info);
  }

  /*
  * register
  * */
  register(userInfos): Observable<any> {
    return this.http.post<any>(this.urlFront + 'user/signup', userInfos);
  }

  /*
  * update userInfos
  * */
  updateUsersInfos(val): Observable<any> {
    return this.http.post(this.urlFront + 'user/update', val);
  }
}
