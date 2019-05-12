import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpRequestService{
  header = {
    token: localStorage.getItem('token')
  };
  // urlFront = 'http://192.168.2.57:8082/'; // 本地服务
  urlFront = 'http://47.102.139.16:8082/';

  constructor(public http: HttpClient) {}


  /*
  * search goods
  * */
  searchGoods(data): Observable<any> {
    console.log(this.header);
    return this.http.post(this.urlFront + 'goods/getGoodsInfo', data, {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        // 'Authorization': 'my-auth-token',
        // 'token': this.header.token
      })
    });
  }

  /*
  * get all Province
  * */
  getProvence(): Observable<any> {
    return this.http.get(this.urlFront + 'goods/findAllProvince');
  }

  /*
  * get cities of province
 * */
  getCities(val): Observable<any> {
     return this.http.get(this.urlFront + 'goods/findCityByProvince/' + val);
  }

  /*
  * get the district by cityId
  * */
  getArea(val): Observable<any> {
    return this.http.get(this.urlFront + 'goods/findAreaByCity/' + val);
  }

  /*
  * 发布消息
  * */
  publishNews(data): Observable<any> {
    return this.http.post(this.urlFront + 'goods/img/upload', data, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      })
    });
  }
  /*
  * delete goods by id
  * */
  deletegoods(val): Observable<any> {
    return this.http.post( this.urlFront + 'goods/delGoods', val);
  }

  /*
  * publish leave words
  * */
  publishLeaveWords(val): Observable<any> {
    return this.http.post(this.urlFront + 'goods/leaveMessage', val);
  }

  /*
  * answer question
  * */
  answerQuestion(val): Observable<any> {
    return this.http.post(this.urlFront + '/goods/answerQuestion', val);
  }
  /*
  * get messages by goods Id
  * */
  getMessages(id: string, pageSize: number, pageNum: number): Observable<any> {
    return this.http.get(this.urlFront + '/goods/getMessage/' + id + '/' + pageNum + '/' + pageSize);
  }
}
