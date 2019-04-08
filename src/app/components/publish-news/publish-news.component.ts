import { Component, OnInit } from '@angular/core';
import 'jquery';
import { PublicDateService } from '../../service/public-date.service';
import { HttpRequestService } from '../../service/http-request.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-publish-news',
  templateUrl: './publish-news.component.html',
  styleUrls: ['./publish-news.component.scss']
})
export class PublishNewsComponent implements OnInit {

  constructor(private PublicDate: PublicDateService,
              public HttpRequest: HttpRequestService,
              private NzMessage: NzMessageService) { }

  goodsClass: any = [];

  saveInfos = {
    goodsWay: 0, // 发布信息标志 0:失物招领  1:失物发布
    username: '', // 用户的登录名
    typeOfGoods: '',
    infoTittle: '',
    decription: '',
    lostPlace: '',
    lostTime: '',
    concPlace: '',
    concPersion: '',
    phoneNo: '',
    qq: '',
    findGoodsQuestion1: '',
    findGoodsQuestion2: '',
    findGoodsQuestion3: '',
    findGoodsAnswer1: '',
    findGoodsAnswer2: '',
    findGoodsAnswer3: '',
    thankWay: null // 0-当面支付  1-平台交易
  };

  headers = {
    token: localStorage.getItem('token')
  };

  userInfos: any; // 用户信息

  isLogined = false; // 判断用户是否登录或是否存在用户登录信息

  ngOnInit() {
    let goodType = this.PublicDate.goodsType.concat();
    goodType.splice(0, 1);
    for (let i = 0, k = -1; i < goodType.length; i++) {
      if (i % 8 === 0) {
        this.goodsClass.push([]);
        k++;
      }
      this.goodsClass[k].push(goodType[i]);
    }
    if (this.headers.token === '') {
      this.isLogined = true;
    } else {
      this.userInfos = JSON.parse(localStorage.getItem('userInfos'));
      this.saveInfos.username = this.userInfos.username;
    }
  }

  /*寻物*/
  lost() {
    $('.nav-tabs').css('border-bottom', '1px rgb(225, 129, 48) solid');
    $('#myTabContent').css('border-color', 'rgb(225, 129, 48)');
    this.saveInfos.goodsWay = 1;
  }

  /*招领*/
  found() {
    $('.nav-tabs').css('border-bottom', '1px rgb(10, 110, 72) solid');
    $('#myTabContent').css('border-color', 'rgb(10, 110, 72)');
    this.saveInfos.goodsWay = 0;
  }

  getDate(e) {
    let date: any = new Date(e);
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    this.saveInfos.lostTime = date.getFullYear() + '-' + month + '-' + day;
  }

  getGoodsType(val) {
    this.saveInfos.typeOfGoods = val;
  }
  /*发布消息*/
  publishNews() {
    console.log(this.saveInfos);
    if (this.isLogined) {
      this.NzMessage.info('亲,请先登录哟！');
      return;
    }
    this.HttpRequest.publishNews(this.saveInfos).subscribe( res => {
      console.log(res);
    });
  }
}
