import { Injectable } from '@angular/core';

/*定义接口*/
interface type {
  key: number,
  val: string
}


@Injectable({
  providedIn: 'root'
})

export class PublicDateService{
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
     {key:'', val:'不限'},
     {key:0, val:'发布感谢信'},
     {key:1, val:'重金酬谢'},
   ];

   hotSearch = [
     {key:0, val: '身份证'},
     {key:1, val: '银行卡'},
     {key:2, val: '钥匙'},
     {key:3, val: '钱包'},
     {key:4, val: '背包'},
   ];

   hotCity = [
     {key:'110000', val: '北京'},
     {key:'310000', val: '上海'},
     {key:2, val: '广州'},
     {key:3, val: '深圳'},
     {key:4, val: '成都'},
     {key:5, val: '杭州'},
     {key:6, val: '南京'},
   ];

    directlyCity = [
      {key: '110000', val: '北京市'},
      {key: '310000', val: '上海市'},
      {key: '120000', val: '天津市'},
      {key: '500000', val: '重庆市'},
    ];


  constructor(){}
}
