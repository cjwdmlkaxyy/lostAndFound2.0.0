/*
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  urlFront:string = 'http://192.168.2.28:8081';
  registerInfos: object = {};

  constructor(
    private http: HttpClient
  ) {
  }

  /!*校验账号*!/
  public checkAccount(account): Observable<any>{
    console.log(this.urlFront +'/user/signphone/' + account);
    return this.http.get<any>(this.urlFront +'/user/signphone/' + account );
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
*/
