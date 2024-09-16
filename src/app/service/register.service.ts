import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  urlFront:string = 'http://192.168.2.28:8085';
  registerInfos: object = {};


  constructor(
    private http: HttpClient
  ) {
  }

  /*校验账号*/
  checkAccount(flag,info): Observable<any>{
    let url = '';
    switch(flag){
      case 'account' :  //校验账号是否重复
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

  register(userInfos){
    this.registerInfos = {
      username:userInfos.account,
      password:userInfos.psd,
      phone:userInfos.phoneNum,
      netName:userInfos.userName,
      birthday:userInfos.birthday,
      email:userInfos.email,
      area:userInfos.area,
      name:userInfos.realName
    };

    this.http.post<any>(this.urlFront + '/user/signup',this.registerInfos).subscribe(
      res =>{
        console.log(res);
      },(err:HttpErrorResponse) => {
        console.log(err);
      }
    )
  }
}
