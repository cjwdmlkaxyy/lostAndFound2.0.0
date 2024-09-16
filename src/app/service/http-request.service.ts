import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class HttpRequestService{
  header = {
    token: localStorage.getItem('token')
  };
  // urlFront = 'http://192.168.2.28:8085/';//本地服务
  urlFront = 'http://144.202.49.116:8085/';

  constructor(public http: HttpClient){}


  /*
  * get the district by cityId
  * */
  getArea(): Observable<any>{
    return this.http.get(this.urlFront + 'goods/findAreaByCity/' + '510100');
  }

  /*
  * search goods
  * */
  searchGoods(data): Observable<any>{
    console.log(this.header);
    return this.http.post(this.urlFront + 'goods/getGoodsInfo', data,{
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        // 'Authorization': 'my-auth-token',
        'token': this.header.token
      })
    });
  }

}
