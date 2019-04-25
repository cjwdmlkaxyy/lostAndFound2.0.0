import { Injectable } from '@angular/core';
import { HttpRequestService} from './http-request.service';

/*定义接口*/

@Injectable({
  providedIn: 'root'
})

export class PublicDateService {
   goodsType = [
     {key: '', val: '不限'},
     {key: 0, val: '钱包'},
     {key: 1, val: '证件'},
     {key: 2, val: '卡类'},
     {key: 3, val: '印章'},
     {key: 4, val: '钥匙'},
     {key: 5, val: '衣物'},
     {key: 6, val: '手机'},
     {key: 7, val: '首饰'},
     {key: 8, val: '票据'},
     {key: 9, val: '数码'},
     {key: 10, val: '电脑'},
     {key: 11, val: '车牌'},
     {key: 12, val: '包裹'},
     {key: 13, val: '车辆'},
     {key: 14, val: '宠物'},
     {key: 15, val: '其他'},
   ];

   thankWay = [
     {key: '', val: '不限'},
     {key: 0, val: '发布感谢信'},
     {key: 1, val: '重金酬谢'},
   ];

   hotSearch = [
     {key: 0, val: '身份证'},
     {key: 1, val: '银行卡'},
     {key: 2, val: '钥匙'},
     {key: 3, val: '钱包'},
     {key: 4, val: '背包'},
   ];

   hotCity = [
     {key: '110000', val: '北京'},
     {key: '310000', val: '上海'},
     {key: 2, val: '广州'},
     {key: 3, val: '深圳'},
     {key: '510100', val: '成都'},
     {key: 5, val: '杭州'},
     {key: 6, val: '南京'},
   ];

  directlyCity = [
    ['110100', '北京市'],
    ['310100', '上海市'],
    ['120100', '天津市'],
    ['500100', '重庆市'],
  ];

  directlyCities = ['北京市', '上海市', '天津市', '重庆市'];

  getProvinces: Array<any> = []; // 得到所有的省
  getAllCities: Array<any> = []; // 得到所有城市,除直辖市外

  constructor(public httpRequest: HttpRequestService) {}

  /*
  * get all province
  * */
  getProvince() {
    this.httpRequest.getProvence().subscribe(res => {
      let province = JSON.parse(res.data);
      for (let i = 0; i < province.length; i++) {
        if (this.directlyCities.indexOf(province[i][1]) === -1) {
          this.getCities(province[i]);
          this.getProvinces = province[i];
        }
      }
    }, err => {
      console.log(err);
    });
  }

  /*
  * get cities of province
  * */
  getCities(province) {
    this.httpRequest.getCities(province[0]).subscribe( res => {
      let city = JSON.parse(res.data);
      // console.log(city);
      let provinceObj = {
        name: province[1],
        val: city
      };
      this.getAllCities.push(provinceObj);
    }, err => {
      console.log(err);
    });
  }


}
