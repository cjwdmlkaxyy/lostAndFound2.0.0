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
    typeOfGoods: '', // 必传
    infoTittle: '', // 必传
    description: '', // 必传
    lostPlace: '', // 丢失地点字符串行-必传
    lostTime: '',
    concPlace: '',
    concPersion: '',
    telPhoneNo: '', // 联系电话-必传
    qq: '', // 可选
    findGoodsQuestion1: '', // 必传
    findGoodsQuestion2: '',
    findGoodsQuestion3: '',
    findGoodsAnswer1: '', // 必传
    findGoodsAnswer2: '',
    findGoodsAnswer3: '',
    thankWay: null, // 0-当面支付  1-平台交易
    file1: null, // 上传图片,必传
    file2: null,
    file3: null,
    province: '510000', // 省id-必传
    city: '510900', // 城市id-必传
    district: '510902', // 区id-必传
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
    this.saveInfos.lostTime = e.getTime();
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
    }, err => {
      console.log(err);
    });
  }

  /*上传图片*/
  uploadImg() {
    // console.log(2222);
    let iMaxFilesize = 2097152; // 2M
    let oFile = document.getElementById('uploadImg1').files[0]; // 读取文件
    console.log(oFile);
    let rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    if (!rFilter.test(oFile.type)) {
      console.log('文件格式必须为图片');
      return;
    }

    if (oFile.size > iMaxFilesize) {
      console.log('图片大小不能超过2M');
      return;
    }
    this.saveInfos.file1 = new FormData(document.getElementById('uploadImg1').files[0]);
    console.log(this.saveInfos.file1);
  }
}
