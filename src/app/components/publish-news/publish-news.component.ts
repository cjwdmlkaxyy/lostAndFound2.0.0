import { Component, OnInit } from '@angular/core';
import 'jquery';
import { PublicDateService } from '../../service/public-date.service';
import { HttpRequestService } from '../../service/http-request.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as $ from 'jquery';
import { PublicService } from '../../service/public.service';
import { CheckValueService } from '../../service/check-value.service';

@Component({
  selector: 'app-publish-news',
  templateUrl: './publish-news.component.html',
  styleUrls: ['./publish-news.component.scss']
})
export class PublishNewsComponent implements OnInit {

  constructor(private PublicDate: PublicDateService,
              public HttpRequest: HttpRequestService,
              private NzMessage: NzMessageService,
              private publiceServe: PublicService,
              public checkValue: CheckValueService) { }

  goodsClass: any = [];
  urlFront = 'http://47.102.139.16:8082/';

  saveInfos: any; // 存储信息的

  provinceList = []; // 获得所有省
  cityList = []; // 城市
  districtList = []; // 区
  provinceName = ''; // 省名称
  cityName = '';
  districtName = '';
  detailAddress = ''; // 详细地址
  isLogined = false; // 判断用户是否登录或是否存在用户登录信息
  showLoading = false;

  headers = {
    token: localStorage.getItem('token')
  };

  userInfos = {// 用户信息
    id: '',
    username: ''
  };
  // 发布信息flags
  saveInfosFlags: any;

  clearSaveInfos() {
   this.saveInfos = {
      goodsWay: 1, // 发布信息标志 0:失物招领-招领  1:失物发布-寻物
      goodsStatus: 0, // 固定传一个0-正在寻找失物或招领
      id: this.userInfos.id, // 用户id,必传
      username: this.userInfos.username, // 登陆账号名，必传
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
      thankWay: 0, // 0-当面支付  1-平台交易
      file1: null, // 上传图片,必传
      file2: null,
      file3: null,
      province: '', // 省id-必传
      city: '', // 城市id-必传
      district: '', // 区id-必传
    };
    this.detailAddress = '';
    $('#timePicker').val('');
  }
  clearSaveInfosFlag() {
    this.saveInfosFlags = {
      goodsType: false,
      infoTittle: false,
      description: false,
      lostTime: false,
      conPerson: false,
      conPhone: false,
      conPhoneErr: false, // 是否输入正确
      firstQuestion: false,
      qqErr: false,
      file: false
    };
  }
  ngOnInit() {
    this.clearSaveInfos();
    this.clearSaveInfosFlag();
    const goodType = this.PublicDate.goodsType.concat();
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
      this.saveInfos.id = this.userInfos.id;
      this.saveInfos.username = this.userInfos.username;
    }
    this.getInitArea();
  }

  getInitArea() {
    /*拿到所有的省、城市、区-默认为四川省-成都市-市辖区*/
    this.HttpRequest.getProvence().subscribe( (res: any) => {
      this.provinceList = JSON.parse(res.data);
      this.saveInfos.province = '510000';
    });
    this.HttpRequest.getCities('510000').subscribe( (res: any) => {
      this.cityList = JSON.parse(res.data);
      this.saveInfos.city = '510100';
    });
    this.HttpRequest.getArea('510100').subscribe( (res: any) => {
      this.districtList = JSON.parse(res.data);
      this.saveInfos.district = this.districtList[0][0];
    });

  }

  /*寻物*/
  lost() {
    $('.nav-tabs').css('border-bottom', '1px rgb(225, 129, 48) solid');
    $('#myTabContent').css('border-color', 'rgb(225, 129, 48)');
    this.clearSaveInfos();
    this.getInitArea();
    // this.saveInfos.id = this.userInfos.id;
    // this.saveInfos.username = this.userInfos.username;
    this.saveInfos.goodsWay = 1;
  }

  /*招领*/
  found() {
    $('.nav-tabs').css('border-bottom', '1px rgb(10, 110, 72) solid');
    $('#myTabContent').css('border-color', 'rgb(10, 110, 72)');
    this.clearSaveInfos();
    this.getInitArea();
    // this.saveInfos.id = this.userInfos.id;
    // this.saveInfos.username = this.userInfos.username;
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
    if (this.isLogined) {
      this.NzMessage.info('请先登录');
      return;
    }
    /*校验发布的信息是否输入正确*/
    if (this.checkInfos()) {
      return;
    }
    this.saveInfos.lostPlace = this.provinceName + this.cityName + this.districtName + this.detailAddress;
    // console.log(this.saveInfos);

    // 将数据封装成FormData
    const data: any = new FormData();
    data.append('goodsWay', this.saveInfos.goodsWay);
    data.append('goodsStatus', this.saveInfos.goodsStatus);
    data.append('id', this.saveInfos.id);
    data.append('username', this.saveInfos.username);
    data.append('typeOfGoods', this.saveInfos.typeOfGoods);
    data.append('infoTittle', this.saveInfos.infoTittle);
    data.append('description', this.saveInfos.description);
    data.append('lostPlace', this.saveInfos.lostPlace);
    data.append('lostTime', this.saveInfos.lostTime);
    data.append('concPlace', this.saveInfos.concPlace);
    data.append('concPersion', this.saveInfos.concPersion);
    data.append('telPhoneNo', this.saveInfos.telPhoneNo);
    data.append('qq', this.saveInfos.qq);
    data.append('findGoodsQuestion1', this.saveInfos.findGoodsQuestion1);
    data.append('findGoodsQuestion2', this.saveInfos.findGoodsQuestion2);
    data.append('findGoodsQuestion3', this.saveInfos.findGoodsQuestion3);
    data.append('findGoodsAnswer1', this.saveInfos.findGoodsAnswer1);
    data.append('findGoodsAnswer2', this.saveInfos.findGoodsAnswer2);
    data.append('findGoodsAnswer3', this.saveInfos.findGoodsAnswer3);
    data.append('thankWay', this.saveInfos.thankWay);
    data.append('file1', this.saveInfos.file1);
    data.append('file2', this.saveInfos.file2);
    data.append('file3', this.saveInfos.file3);
    data.append('province', this.saveInfos.province);
    data.append('city', this.saveInfos.city);
    data.append('district', this.saveInfos.district);

    const _this = this;
    this.showLoading = true;
    // 用ajax请求实现上传图片
    $.ajax({
      url: this.urlFront + 'goods/img/upload',
      // url: 'http://127.0.0.1:8082/' + 'goods/img/upload',
      type: 'POST',
      data: data,
      contentType: false,
      processData: false,
      success: function(res) {
        _this.showLoading = false;
        _this.NzMessage.success('发布消息成功');
        _this.clearSaveInfos();
        _this.clearSaveInfosFlag();
        $('#uploadImg1').val('');
      },
      error: function (err) {
        console.log(err);
        _this.showLoading = false;
        _this.NzMessage.error('消息发布失败,请稍候重新发布');
      }
    });
  }

  /*上传图片*/
  uploadImg() {
    const iMaxFilesize = 2097152; // 2M
    const oFile: any = document.getElementById('uploadImg1'); // 读取文件
    const oFileVal: any = oFile.files[0];
    const rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/;
    if (!rFilter.test(oFileVal.type)) {
      this.NzMessage.warning('请选图片');
      $('#uploadImg1').val('');
      this.saveInfos.file1 = null;
      return;
    }

    if (oFileVal.size > iMaxFilesize) {
      $('#uploadImg1').val('');
      this.NzMessage.warning('图片大小不能超过2M');
      this.saveInfos.file1 = null;
      return;
    }
    this.saveInfos.file1 = oFileVal;
  }

  /*选择了省、城市、区*/
  selectedProvince(val) {
    for (const item of this.provinceList) {
      if (item[1] === val) {
        this.saveInfos.province = item[0];
        this.provinceName = item[1];
        break;
      }
    }
    // 实现省市区联动
    this.HttpRequest.getCities(this.saveInfos.province).subscribe( (res: any) => {
      this.cityList = JSON.parse(res.data);
      this.saveInfos.city = this.cityList[0][0];

      this.HttpRequest.getArea(this.saveInfos.city).subscribe( (res1: any) => {
        this.districtList = JSON.parse(res1.data);
        this.saveInfos.district = this.districtList[0][0];
      });
    });
  }
  selectedCity(val) {
    for (const item of this.cityList) {
      if (item[1] === val) {
        this.saveInfos.city = item[0];
        this.cityName = item[1];
        break;
      }
    }
    this.HttpRequest.getArea(this.saveInfos.city).subscribe( (res: any) => {
      this.districtList = JSON.parse(res.data);
      this.saveInfos.district = this.districtList[0][0];
    });
  }
  selectedArea(val) {
    for (const item of this.districtList) {
      if (item[1] === val) {
        this.saveInfos.district = item[0];
        this.districtName = item[1];
      }
    }
  }

  // 检查要发布的信息是否输入正确
  checkInfos() {
    let flag = false;
    if (this.saveInfos.typeOfGoods === '') {
      this.saveInfosFlags.goodsType = true;
      flag = true;
    }
    if (this.saveInfos.infoTittle === '') {
      this.saveInfosFlags.infoTittle = true;
      flag = true;
    }
    if (this.saveInfos.description === '' || this.saveInfos.description.length >255 || this.saveInfos.description.length < 15) {
      this.saveInfosFlags.description = true;
      flag = true;
    }
    if (this.saveInfos.lostTime === '' || this.saveInfos.lostTime === null){
      this.saveInfosFlags.lostTime = true;
      flag = true;
    }
    if (this.saveInfos.concPersion === '' || this.saveInfos.concPersion === null) {
      this.saveInfosFlags.conPerson = true;
      flag = true;
    }
    if (this.saveInfos.telPhoneNo === '' || this.saveInfos.telPhoneNo === null) {
      this.saveInfosFlags.conPhone = true;
      flag = true;
    }
    if (this.saveInfos.findGoodsQuestion1 === '' || this.saveInfos.findGoodsAnswer1 === '') {
      this.saveInfosFlags.firstQuestion = true;
      flag = true;
    }
    if (!this.saveInfos.file1) {
      this.saveInfosFlags.file = true;
      flag = true;
    }

    $('.icon-danger').each(function (e) {
      flag = true;
    });

    if (flag) {
      return true;
    } else {
      return false;
    }
  }

  checkVal(val: any, flag: any) {
    console.log(flag, val);
    if (flag === 'phone') {
      if (!val) {
        return;
      } else if (this.checkValue.checkPhoneNum(val)) {
        this.saveInfosFlags.conPhoneErr = false;
      } else {
        this.saveInfosFlags.conPhoneErr = true;
      }
    } else {
      if (!val) {
        return;
      } else if (this.checkValue.checkQQ(val)) {
        this.saveInfosFlags.qqErr = false;
      } else {
        this.saveInfosFlags.qqErr = true;
      }
    }
  }

}
